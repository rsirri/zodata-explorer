import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";

/**
 * @namespace zodataexplorer.controller
 */
export default class View1 extends Controller {

    public onInit(): void {

    }

    // ============================
    // FOR V2 BUTTON PRESSED
    // ============================
    onV2Press(): void {
        (this.getOwnerComponent() as UIComponent).getRouter().navTo("RouteView2", {type: "v2" });
    }

    // ============================
    // FOR V2 BUTTON PRESSED
    // ============================
    onV4Press(): void {
        (this.getOwnerComponent() as UIComponent).getRouter().navTo("RouteView2", { type: "v4" });
    }
    

}
