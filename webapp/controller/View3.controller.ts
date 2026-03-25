import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";
import Event from "sap/ui/base/Event";

export default class View3 extends Controller {

    onInit(): void {
        const router = (this.getOwnerComponent() as UIComponent).getRouter();
        router.getRoute("RouteView3")?.attachPatternMatched(this.onRouteMatched, this);
    }

    // async onRouteMatched(): Promise<void> {
    //     // get selected service from component model
    //     const serviceModel = (this.getOwnerComponent() as UIComponent)
    //         .getModel("selectedService") as JSONModel;

    //     this.getView()?.setModel(serviceModel);

    //     // fetch entity sets
    //     try {
    //         const serviceId = serviceModel.getProperty("/ID");
    //         // const url = `/sap/opu/odata/IWFND/CATALOGSERVICE;v=2/ServiceCollection('${serviceId}')/EntitySets?$format=json`;
    //         const url = `/sap/opu/odata/IWFND/CATALOGSERVICE;v=2/ServiceCollection('${encodeURIComponent(serviceId)}')/EntitySets?$format=json`;

    //         const response = await fetch(url);
    //         const data = await response.json();

    //         const entitySets = data.d.results.map((es: any) => ({
    //             name: es.Name || es
    //         }));

    //         serviceModel.setProperty("/entitySets", entitySets);

    //     } catch (error) {
    //         console.error("Error fetching entity sets:", error);
    //     }
    // }
    async onRouteMatched(): Promise<void> {
        const serviceModel = (this.getOwnerComponent() as UIComponent)
            .getModel("selectedService") as JSONModel;
        this.getView()?.setModel(serviceModel);

        const metadataUrl = serviceModel.getProperty("/MetadataUrl");

        // V4 services don't have MetadataUrl — skip entity sets fetch
        if (!metadataUrl) {
            serviceModel.setProperty("/entitySets", []);
            return;  // ← exit early, don't crash
        }

        try {
            
            const url = new URL(metadataUrl);
            const relativePath = url.pathname;

            const response = await fetch(relativePath);
            const text = await response.text();

            // Parse XML to find EntitySet names
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "text/xml");

            // Find all EntitySet elements
            const entitySetNodes = xmlDoc.querySelectorAll("EntitySet");
            
            const entitySets = Array.from(entitySetNodes).map(node => ({
                name: node.getAttribute("Name"),
                entityType: node.getAttribute("EntityType")
            }));

            console.log("Entity Sets found:", entitySets.length);
            serviceModel.setProperty("/entitySets", entitySets);

        } catch (error) {
            console.error("Error:", error);
        }
    }

    onNavBack(): void {
        const serviceModel = (this.getOwnerComponent() as UIComponent)
            .getModel("selectedService") as JSONModel;
        const serviceType = serviceModel.getProperty("/ServiceType");
        const type = serviceType === "V4" ? "v4" : "v2";
        
        (this.getOwnerComponent() as UIComponent)
            .getRouter().navTo("RouteView2", { type: type });
    }
    
}