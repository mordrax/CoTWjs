/// <reference path="../references.ts"/>

/**
 * Base class for all living things in the game, hero, monsters, friendly npcs etc
 */
class Actor extends Entity {
    private _hpMax : number;            // maximum health points
    private _hp : number;               // current health points
    private _att : number;              // attack
    private _def : number;              // defence
    private _toHit : number;            // % chance to hit

    constructor(id: string, sprite:Resource, coord:WorldCoordinates) {
        super(id, EntityType.Actor, sprite, coord);

        this._hpMax = 50;
        this._hp = this._hpMax;
        this._att = 2;
        this._def = 1;
        this._toHit = 50;
    }

    // pass in the target that is being attacked
    Attack(target: Actor ){
        var consoleMsg;
        var swing = D(100) + this._toHit;
        if (swing > 99){ //hit and deal damage
            var targetStats = target.getStats();
            var damage = (this._att - targetStats._def) * D(10);
            target.TakeDamage(damage);
            if (target.isDead()){
                consoleMsg = (<Player>this).msgKill(damage, target.id);
            }
            else {
                consoleMsg = (<Player>this).msgHit(damage, target.id);
            }
        }
        else {   //miss
            swing = swing - 50;
            consoleMsg = (<Player>this).msgMiss(swing, target.id);
        }
        Log(consoleMsg);
        //console.log(this.id + ' hit the ' + target.id + ' for ' + damage + ' damage... Ouch!!!');
        //console.log(target.id + ' only has ' + targetStats._hp + ' hit points left!');
    }

    // deducts health based on the value passed in
    TakeDamage(damage: number){
        this._hp = this._hp - damage;
    }

    getStats(){
        return this;
    }

    // returns true if hit points are less than or equal to 0
    isDead(): boolean {
        return (this._hp <= 0);
    }



}
