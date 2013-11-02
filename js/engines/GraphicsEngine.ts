/// <reference path="../references.ts"/>
class GraphicsEngine {
    _canvas:HTMLCanvasElement;
    _ctx:CanvasRenderingContext2D;
    _resources:{};
    _loading:number;

    _centerPoint:Point;
    _canvasTileSize:Point;

    constructor() {
        this._canvas = (<HTMLCanvasElement>$('#world')[0]);
        this._ctx = this._canvas.getContext('2d');
        this._resources = {};
        this._loading = 0;
        this._centerPoint = new Point(0, 0);
        this.LoadResources();
        this.InitialiseScreen();
        this.InitialiseUI();

        Game.World.updatedEvent.add((entity:Entity) => {
            this.Draw(entity);
        });

        $(window).on('resize', () => this.InitialiseScreen());
    }

    private Draw(entity:Entity) {
        var sprite = entity.sprite;
        var location = entity.location;

        var canvasPos = new Point(
            (location.position.X - this._centerPoint.X + this._canvasTileSize.X / 2) * TILE_SIZE,
            (location.position.Y - this._centerPoint.Y + this._canvasTileSize.Y / 2) * TILE_SIZE
        );
        if (entity.sprite.turn != 0) {
            this._ctx.save();
            this._ctx.translate(canvasPos.X + TILE_SIZE / 2, canvasPos.Y + TILE_SIZE / 2);
            this._ctx.rotate(entity.sprite.turn);
            this._ctx.translate(-canvasPos.X - TILE_SIZE / 2, -canvasPos.Y - TILE_SIZE / 2);
        }

        this._ctx.drawImage(
            this._resources[sprite.type], // src image
            sprite.offset.x, sprite.offset.y,  // start pixel in src
            sprite.size.w, sprite.size.h,      // pixel size of src
            canvasPos.X, canvasPos.Y, // pixel location on canvas
            sprite.size.w, sprite.size.h       // pixel size on canvas
        );

        if (entity.sprite.turn != 0) {
            this._ctx.restore();
        }
    }

    public UpdateCenter(point:Point) {
        this._centerPoint = point;
    }

    private createImgElement(src:string):HTMLImageElement {
        var elm = document.createElement('img');
        elm.src = src;
        return elm;
    }

    private InitialiseScreen() {
        var screenSize = new Point($(window).width(), $(window).height());
        this._canvas.width = screenSize.X - 128;
        this._canvas.height = screenSize.Y
            - $('#file-menu').height()
            - $('#button-menu').height()
            - $('#messages').height()
            - $('.title').height()
            - 100;

        this._canvasTileSize = new Point(
            Math.floor(this._canvas.width / TILE_SIZE),
            Math.floor(this._canvas.height / TILE_SIZE)
        );

        console.log('initialising screen');
    }

    public Clear() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    private LoadResources() {
        this._resources[ResourceType.buildings_2x     ] = this.createImgElement('assets/resources/2x_buildings.png');
        this._resources[ResourceType.buildings_3x     ] = this.createImgElement('assets/resources/3x_buildings.png');
        this._resources[ResourceType.buildings_4x     ] = this.createImgElement('assets/resources/4x_buildings.png');
        this._resources[ResourceType.buildings_5x     ] = this.createImgElement('assets/resources/5x_buildings.png');
        this._resources[ResourceType.SpellEffects     ] = this.createImgElement('assets/resources/spell_effects.png');
        this._resources[ResourceType.DifficultyLevel  ] = this.createImgElement('assets/resources/difficulty_level.png');
        this._resources[ResourceType.Monsters         ] = this.createImgElement('assets/resources/monsters.png');
        this._resources[ResourceType.Items            ] = this.createImgElement('assets/resources/items.png');
        this._resources[ResourceType.Spells           ] = this.createImgElement('assets/resources/spells.png');
        this._resources[ResourceType.Tiles            ] = this.createImgElement('assets/resources/tiles.png');
        this._resources[ResourceType.buildings_1x     ] = this.createImgElement('assets/resources/1x_buildings.png');
    }

    private InitialiseUI() {
        $('button.menu').button();

        $('button.quick-menu').button();

        // create file menu, set to not visible
        $('#file-menu-file').click(function () {
            $('#menu-file').toggle();
        });

        $('#file-menu-character').click(function () {
            console.log('Please implement the character menu!!!');
        });
        $('#file-menu-inventory').click(function () {
            console.log('Please implement the inventory menu!!!');
        });
        $('#file-menu-map').click(function () {
            console.log('Please implement the map menu!!!');
        });
        $('#file-menu-spell').click(function () {
            console.log('Please implement the spell menu!!!');
        });
        $('#file-menu-activate').click(function () {
            console.log('Please implement the activate menu!!!');
        });
        $('#file-menu-verbs').click(function () {
            console.log('Please implement the verbs menu!!!');
        });
        $('#file-menu-window').click(function () {
            console.log('Please implement the window menu!!!');
        });
        $('#menu-window-main').click(() => {
            this.Screen(ScreenType.Main);
        });
        $('#menu-window-shop').click(() => {
            this.Screen(ScreenType.Shop);
        });
        $('#menu-exit').click(() => {
            this.Screen(ScreenType.Main);
        });
        $('#menu-sortpack').click(function () {
            $('#top-window').append('<div class="equipment"></div>');
        });
        $('#menu-nameobject').click(function () {
            $('#bottom-window').append('<div class="equipment"></div>');
        });
    }

    public Screen(screen:ScreenType) {
        switch (screen) {
            case ScreenType.Shop:
                $('#main-game-window').hide();
                $('#shop-window').show();
                $('[data-visible-menu="main"]').hide();
                $('[data-visible-menu="shop"]').show();
                break;
            case ScreenType.Main:
            default:
                $('#main-game-window').show();
                $('#shop-window').hide();
                $('[data-visible-menu="main"]').show();
                $('[data-visible-menu="shop"]').hide();
        }
    }

    /**
     * Show the hero equipment and all open containers.
     * Allow moving between containers and triggers logic for buy/sell, identify, junk, etc etc
     * @param equipment
     * @param shop
     * @constructor
     */
    public UpdateInventory(equipment:IEquipment, shop:Shop) {
        //show contents of main inventory
        var main_wares = shop.inventory.wares;

        // keeps track of all containers to their html id attribute so items can be placed into dropped containers and removed too
        var containerRegister:{[id:string]:Container} = {};

        // clear shop, containers
        $('#equipment-side').empty();

        this.CreateInventoryView("main", shop.id, shop.inventory.wares);
        containerRegister["main"] = shop.inventory.wares;

        // clear equipment slots
        $('.equipment-slot-inner').empty();
        $('.equipment-slot label').show();

        for (var slot in equipment) {

            var item:Item = equipment[slot];
            if (!item) continue;

            // add item to slot and hide label
            var $slot = $('#slot-' + slot + ' .equipment-slot-inner');
            this.AddToInventory($slot, item);
            $slot.siblings().hide();

            if (!!item.container) {
                if (item.container.opened) {
                    this.CreateInventoryView(item.ID.toString(), item.base.name, item.container);
                    containerRegister[item.ID.toString()] = item.container;                    
                }
            }
        }

        $(".container").sortable({
            connectWith: '.container',
            receive: (event, ui) => {

                // work out if sender, reciever from main or other containers or equipment slot

                var $reciever:JQuery = $(event.target);
                var senderID = $(ui.sender[0]).parent().attr('id');
                var recieverID = $reciever.parent().attr('id');
                console.log("sender:"+senderID+" reciever:"+recieverID);

                var sender:any;   // either a container or a equipment slot depending on sender
                var reciever:any; // either a container or a equipment slot depending on sender

                // check where the item is dragged from
                if (senderID.indexOf('container-main') == 0) {
                    sender = containerRegister["main"];
                } else if (senderID.indexOf('container-') == 0) {
                    sender = containerRegister[senderID.substring(10)];
                } else if (senderID.indexOf('slot-') == 0) {
                    sender = senderID.substring(5);
                } else {
                    console.log("ERROR: Unknown sender, not container or item");
                    console.dir(ui.sender);
                }

                // check where the item is dragged to
                if (recieverID.indexOf('container-main') == 0) {
                    reciever = containerRegister["main"];
                } else if (recieverID.indexOf('container-') == 0) {
                    reciever = containerRegister[recieverID.substring(10)];
                } else if (recieverID.indexOf('slot-') == 0) {
                    reciever = recieverID.substring(5);
                } else {
                    console.log("ERROR: Unknown reciever, not container or item");
                    console.dir($reciever.parent());
                }

                console.dir(sender);
                console.dir(reciever);

                // if moving into equipment slot
                if ($reciever.hasClass('equipment-slot-inner')) {
                    // move the slot item out
                    $reciever.children().not("#" + ui.item[0].id).appendTo(ui.sender[0]);
                    if ($reciever.children().length > 0) {
                        $reciever.siblings('.equipment-slot-nulltext').hide();
                    }

                    // move item into slot
                    equipment[reciever] = sender.items[ui.item[0].id.substring(5)];
                } else {
                    if (sender instanceof Container) {
                        (<Container>reciever).Add((<Container>sender).Take(ui.item[0].id.substring(5)));
                    } else {
                        (<Container>reciever).Add(equipment[sender]);
                        sender = null;
                    }

                }
            },
            remove: (event, ui) => {
                var $reciever:JQuery = $(event.target);
                if ($reciever.children().length === 0) {
                    $reciever.siblings('.equipment-slot-nulltext').show();
                }
            }
        }).disableSelection();


        //calculate all equipment-side window heights
        $("#equipment-side").each(function () {
            var $this = $(this);
            var $children = $this.children();

            $children.height($this.height() / $children.length);
        });
    }

    private AddToInventory(jqEle:JQuery, item:Item) {// id:string, sprite:Resource, label:string) {
        jqEle.append(Format(
            "<div id='{0}' class='equipment'>" +
                "<div style=\"width:32px;height:32px;background:url('assets\/resources\/items.png') -{1}px -{2}px;display:block;margin:0 auto;\"></div>" +
                "{3}" +
                "</div>", Item.GetIDString(item), item.base.sprite.offset.x, item.base.sprite.offset.y, item.base.name));
    }

    private CreateInventoryView(id:string, name:string, container:Container) {
        var $container = $(Format("<div id='container-{0}'>" +
            "<div class='title'>{1}</div>" +
            "</div>", id, name));
        var $containerInner = $(Format("<div id='container-{0}-inner' class='container'></div>", id));

        $container.append($containerInner);

        $('#equipment-side').append($container);

        for (var itemID in container.items) {
            this.AddToInventory($containerInner, container.items[itemID]);
        }
    }


}