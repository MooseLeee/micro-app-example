/// <reference types="react-scripts" />
declare module "*.scss" {
    const content: { [className: string]: string };
    export default content;
}

declare module "*.ts" {
    const content: { [className: string]: string };
    export default content;
}