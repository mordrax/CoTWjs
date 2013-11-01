/// <reference path="../references.ts"/>
class GraphicsEngine {
    _canvas : HTMLCanvasElement;
    _ctx : CanvasRenderingContext2D;
    _resources : {};
    _loading : number;

    _centerPoint : Point;
    _canvasTileSize:Point;

    constructor() {
        this._canvas = (<HTMLCanvasElement>$('#world')[0]);
        this._ctx = this._canvas.getContext('2d');
        this._resources = {};
        this._loading = 0;
        this._centerPoint = new Point(0,0);
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
            (location.position.X-this._centerPoint.X+this._canvasTileSize.X/2)*TILE_SIZE,
            (location.position.Y-this._centerPoint.Y+this._canvasTileSize.Y/2)*TILE_SIZE
        );
        if (entity.sprite.turn != 0) {
            this._ctx.save();
            this._ctx.translate(canvasPos.X + TILE_SIZE/2, canvasPos.Y + TILE_SIZE/2);
            this._ctx.rotate(entity.sprite.turn);
            this._ctx.translate(-canvasPos.X - TILE_SIZE/2, -canvasPos.Y - TILE_SIZE/2);
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

    private createImgElement(src : string) : HTMLImageElement {
        var elm = document.createElement('img');
        elm.src = src;
        return elm;
    }

    private InitialiseScreen() {
        var screenSize = new Point($(window).width(), $(window).height());
        this._canvas.width = screenSize.X-128;
        this._canvas.height = screenSize.Y
            - $('#file-menu').height()
            - $('#button-menu').height()
            - $('#messages').height()
            - $('.title').height()
            - 100;

        this._canvasTileSize = new Point(
            Math.floor(this._canvas.width/TILE_SIZE),
            Math.floor(this._canvas.height/TILE_SIZE)
        );

        console.log('initialising screen');
    }

    public Clear() {
        this._ctx.clearRect(0,0,this._canvas.width, this._canvas.height);
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
        $('#file-menu-file').click(function() {
            $('#menu-file').toggle();
        })

        $('#file-menu-character').click(function() {
            console.log('Please implement the character menu!!!');
        })
        $('#file-menu-inventory').click(function() {
            console.log('Please implement the inventory menu!!!');
        })
        $('#file-menu-map').click(function() {
            console.log('Please implement the map menu!!!');
        })
        $('#file-menu-spell').click(function() {
            console.log('Please implement the spell menu!!!');
        })
        $('#file-menu-activate').click(function() {
            console.log('Please implement the activate menu!!!');
        })
        $('#file-menu-verbs').click(function() {
            console.log('Please implement the verbs menu!!!');
        })
        $('#file-menu-window').click(function() {
            console.log('Please implement the window menu!!!');
        })
        $('#menu-window-main').click(() => {
            this.Screen(ScreenType.Main);
        })
        $('#menu-window-shop').click(() => {
            this.Screen(ScreenType.Shop);
        })
        $('#menu-exit').click(() => {
            this.Screen(ScreenType.Main);
        });
        $('#menu-sortpack').click(function() {
            $('#top-window').append('<div class="equipment"></div>');
        })
        $('#menu-nameobject').click(function() {
            $('#bottom-window').append('<div class="equipment"></div>');
        })
    }

    public Screen(screen:ScreenType) {
            switch(screen) {
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

    public UpdateInventory(equipment:IEquipment, mainInventory:Inventory) {
        //show contents of main inventory
        var main_items = mainInventory.GetItems();
        main_items.forEach(x => {
            this.AddToMainInventory(x.ID, x.item.sprite, x.item.name);
        });

        for (var slot in equipment) {
            var item:Item = equipment[slot];
            if (!item) continue;

            this.AddToSlot(slot, item.item.sprite);
            if (item instanceof Container) {
                var container = <Container>item;
                if (container.opened) {
                    // show contents of container
                }
            }
        }
    }

    private AddToMainInventory(id:number, sprite:Resource, label:string) {
        $('#top-window').append('<div id=item-{0} class="equipment"><div style="width:32px;height:32px;background:url(\'assets\/resources\/items.png\') -{1}px -{2}px;display:block;margin:0 auto;"></div>{3}</div>'.format(id, sprite.offset.x, sprite.offset.y, label));
        console.log("trying to show shop inventory" + id + " " + sprite);
    }

    private AddToSlot(slot:string, sprite:Resource) {
        var $slot = $('#slot-'+slot);
        $slot.attr('style', 'width:32px;height:32px;background:url(\'assets\/resources\/items.png\') -'+sprite.offset.x+'px -'+sprite.offset.y+'px');
    }
}