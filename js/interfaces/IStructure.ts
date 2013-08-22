/// <reference path="../references.ts"/>

/**
 * Definition for a structure which can be drawn - Kaan
 */
interface IStructure extends IDrawable {
    /**
     * Point relative to StartPosition of building
     */
    EntryPoint() : Point;

    /**
     * Top left of building
     */
    StartPosition() : Point;

    /**
     * Event handler to call when building activates
     */
    Enter();
}
