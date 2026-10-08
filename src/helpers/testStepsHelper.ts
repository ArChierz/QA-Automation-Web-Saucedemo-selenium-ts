import * as allure from "allure-js-commons";

export const StepHelper = {

    init(context: any){
        // initialize mepty steps array on every `it`
        context.steps = [];
    },

    // Helper function to push steps cleanly
    add(context: any, message: string) {
        if (!context.steps) context.steps = [];
        context.steps.push(message);
        // put into allure dashboard
        allure.step(message, () => {});
    }
}