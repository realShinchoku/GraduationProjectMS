declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";

declare module "*.scss" {
    const content: { [className: string]: string };
    export = content;
}

declare module "*.png" {
    const value: any;
    export default value;
}
