interface BlockUIOptions {
    message?: string;
    onOverLayClick?: ()=>any;

}
interface JQueryStatic {
    blockUI: (opt:BlockUIOptions) => any;
    unblockUI: () => any;
}