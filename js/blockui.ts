interface BlockUIOptions {
    message?: any;
    onOverLayClick?: ()=>any;

}
interface JQueryStatic {
    blockUI: (opt:BlockUIOptions) => any;
    unblockUI: () => any;
}