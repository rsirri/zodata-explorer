import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import Table from "sap/m/Table";
import SearchField from "sap/m/SearchField";
import Event from "sap/ui/base/Event";
import ColumnListItem from "sap/m/ColumnListItem";

export default class View2 extends Controller {

    onInit(): void {
        const router = (this.getOwnerComponent() as UIComponent).getRouter();
        router.getRoute("RouteView2")?.attachPatternMatched(this.onRouteMatched, this);
    }

    async onRouteMatched(event: Event): Promise<void> {
        const type = (event as any).getParameter("arguments").type;
        const isV2 = type === "v2";

        // set title
        const model = new JSONModel({
            title: isV2 ? "V2 OData Services" : "V4 OData Services",
            services: []
        });
        this.getView()?.setModel(model);

        // fetch services
        try {
            const url = isV2
                ? "/sap/opu/odata/IWFND/CATALOGSERVICE;v=2/ServiceCollection?$format=json&$orderby=TechnicalServiceName"
                : "/sap/opu/odata4/iwfnd/config/default/iwfnd/catalog/0001/ServiceCollection?$format=json";

            const response = await fetch(url);
            const data = await response.json();

            // V2 response: data.d.results
            // V4 response: data.value
            const services = isV2 ? data.d.results : data.value;

            model.setProperty("/services", services);

        } catch (error) {
            console.error("Error fetching services:", error);
        }
    }

    onSearch(event: Event): void {
        const query = (event.getSource() as SearchField).getValue();
        const table = this.byId("idServiceTable") as Table;
        const binding = table.getBinding("items") as ListBinding;

        if (query) {
            const filters = [
                new Filter({
                    filters: [
                        new Filter("TechnicalServiceName", FilterOperator.Contains, query),
                        new Filter("Description", FilterOperator.Contains, query)
                    ],
                    and: false
                })
            ];
            binding.filter(filters);
        } else {
            binding.filter([]);
        }
    }

    onServicePress(event: Event): void {
        const row = event.getSource() as ColumnListItem;  // ← getSource() not getParameter
        const ctx = row.getBindingContext();
        const service = ctx?.getObject();

        if (!service) return;

        const jsonModel = new JSONModel();
        jsonModel.setData(service);
        (this.getOwnerComponent() as UIComponent).setModel(jsonModel, "selectedService");
        (this.getOwnerComponent() as UIComponent).getRouter().navTo("RouteView3", { id: (service as any).ID });
    }

    onNavBack(): void {
        (this.getOwnerComponent() as UIComponent).getRouter().navTo("RouteView1");
    }
}