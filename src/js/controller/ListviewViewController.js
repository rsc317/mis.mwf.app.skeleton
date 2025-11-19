import {mwf} from "vfh-iam-mwf-base";
import {MediaItem} from "../model/MediaItem.js";

export default class ListviewViewController extends mwf.ViewController {

    // instance attributes set by mwf after instantiation
    args;
    root;
    items;
    addNewMediaItemElement;
    /*
     * for any view: initialise the view
     */
    async oncreate() {

        this.addNewMediaItemElement = this.root.querySelector("#addNewMediaItem");

        this.addNewMediaItemElement.onclick = (() => {
            this.createNewItem();
        });

        this.addListener(new mwf.EventMatcher("crud","created","MediaItem"), ((event) => {
                this.addToListview(event.data);
            })
        );
        this.addListener(new mwf.EventMatcher("crud","updated","MediaItem"), ((event) => {
                this.updateInListview(event.data._id, event.data);
            })
        );
        this.addListener(new mwf.EventMatcher("crud","deleted","MediaItem"), ((event) => {
                this.removeFromListview(event.data);
            })
        );

        MediaItem.readAll().then((items) => {
            this.initialiseListview(items);
        })

        super.oncreate();
    }

    constructor() {
        super();
        console.log("ListviewViewController()");
    }

    onListItemSelected(itemobj, listviewid) {
        this.nextView("mediaReadview",{item: itemobj});
        console.log("Ausgewähltes Element:", itemobj);
    }

    /*
     * for views with dialogs
     * TODO: delete if no dialogs are used or if generic controller for dialogs is employed
     */
    bindDialog(dialogid, dialogview, dialogdataobj) {
        // call the supertype function
        super.bindDialog(dialogid, dialogview, dialogdataobj);

        // TODO: implement action bindings for dialog, accessing dialog.root
    }

    // CRUD FUNCTIONS

    createNewItem() {
        const newItem = new MediaItem();
        newItem.src = "https://picsum.photos/400/400";

        this.showDialog("mediaItemDialog",{
            item: newItem,
            actionBindings: {
                submitForm: ((event) => {
                    event.original.preventDefault();
                    newItem.create().then(() => {
                    });
                    this.hideDialog();
                })
            }
        });
    }

    deleteItem(item) {
        item.delete().then(() => {
        });
    }

    editItem(item) {
        this.showDialog("mediaItemDialog", {
            item: item,
            actionBindings: {
                submitForm: ((event) => {
                    event.original.preventDefault();
                    item.update().then(() => {
                    });
                    this.hideDialog();
                }),
                deleteItem: ((event) => {
                    this.deleteItem(item);
                    this.hideDialog();
                })
            }
        });
    }
}
