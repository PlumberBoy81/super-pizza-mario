class ActionKind {
    static RunningLeft: number
    private ___RunningLeft_is_set: boolean
    private ___RunningLeft: number
    get RunningLeft(): number {
        return this.___RunningLeft_is_set ? this.___RunningLeft : ActionKind.RunningLeft
    }
    set RunningLeft(value: number) {
        this.___RunningLeft_is_set = true
        this.___RunningLeft = value
    }
    
    static RunningRight: number
    private ___RunningRight_is_set: boolean
    private ___RunningRight: number
    get RunningRight(): number {
        return this.___RunningRight_is_set ? this.___RunningRight : ActionKind.RunningRight
    }
    set RunningRight(value: number) {
        this.___RunningRight_is_set = true
        this.___RunningRight = value
    }
    
    static Idle: number
    private ___Idle_is_set: boolean
    private ___Idle: number
    get Idle(): number {
        return this.___Idle_is_set ? this.___Idle : ActionKind.Idle
    }
    set Idle(value: number) {
        this.___Idle_is_set = true
        this.___Idle = value
    }
    
    static IdleLeft: number
    private ___IdleLeft_is_set: boolean
    private ___IdleLeft: number
    get IdleLeft(): number {
        return this.___IdleLeft_is_set ? this.___IdleLeft : ActionKind.IdleLeft
    }
    set IdleLeft(value: number) {
        this.___IdleLeft_is_set = true
        this.___IdleLeft = value
    }
    
    static IdleRight: number
    private ___IdleRight_is_set: boolean
    private ___IdleRight: number
    get IdleRight(): number {
        return this.___IdleRight_is_set ? this.___IdleRight : ActionKind.IdleRight
    }
    set IdleRight(value: number) {
        this.___IdleRight_is_set = true
        this.___IdleRight = value
    }
    
    static JumpingLeft: number
    private ___JumpingLeft_is_set: boolean
    private ___JumpingLeft: number
    get JumpingLeft(): number {
        return this.___JumpingLeft_is_set ? this.___JumpingLeft : ActionKind.JumpingLeft
    }
    set JumpingLeft(value: number) {
        this.___JumpingLeft_is_set = true
        this.___JumpingLeft = value
    }
    
    static JumpingRight: number
    private ___JumpingRight_is_set: boolean
    private ___JumpingRight: number
    get JumpingRight(): number {
        return this.___JumpingRight_is_set ? this.___JumpingRight : ActionKind.JumpingRight
    }
    set JumpingRight(value: number) {
        this.___JumpingRight_is_set = true
        this.___JumpingRight = value
    }
    
    static CrouchLeft: number
    private ___CrouchLeft_is_set: boolean
    private ___CrouchLeft: number
    get CrouchLeft(): number {
        return this.___CrouchLeft_is_set ? this.___CrouchLeft : ActionKind.CrouchLeft
    }
    set CrouchLeft(value: number) {
        this.___CrouchLeft_is_set = true
        this.___CrouchLeft = value
    }
    
    static CrouchRight: number
    private ___CrouchRight_is_set: boolean
    private ___CrouchRight: number
    get CrouchRight(): number {
        return this.___CrouchRight_is_set ? this.___CrouchRight : ActionKind.CrouchRight
    }
    set CrouchRight(value: number) {
        this.___CrouchRight_is_set = true
        this.___CrouchRight = value
    }
    
    static Flying: number
    private ___Flying_is_set: boolean
    private ___Flying: number
    get Flying(): number {
        return this.___Flying_is_set ? this.___Flying : ActionKind.Flying
    }
    set Flying(value: number) {
        this.___Flying_is_set = true
        this.___Flying = value
    }
    
    static Jumping: number
    private ___Jumping_is_set: boolean
    private ___Jumping: number
    get Jumping(): number {
        return this.___Jumping_is_set ? this.___Jumping : ActionKind.Jumping
    }
    set Jumping(value: number) {
        this.___Jumping_is_set = true
        this.___Jumping = value
    }
    
    public static __initActionKind() {
        ActionKind.RunningLeft = 0
        ActionKind.RunningRight = 1
        ActionKind.Idle = 2
        ActionKind.IdleLeft = 3
        ActionKind.IdleRight = 4
        ActionKind.JumpingLeft = 5
        ActionKind.JumpingRight = 6
        ActionKind.CrouchLeft = 7
        ActionKind.CrouchRight = 8
        ActionKind.Flying = 9
        ActionKind.Jumping = 10
    }
    
}

ActionKind.__initActionKind()

namespace SpriteKind {
    export const Bumper = SpriteKind.create()
    export const Flier = SpriteKind.create()
    export const Goal = SpriteKind.create()
    export const Coin = SpriteKind.create()
}

// ### Initialize Variables ####
let heroFacingLeft = false
let coin : Sprite = null
let playerStartLocation : tiles.Location = null
let flier : Sprite = null
let bumper : Sprite = null
let mainJumpRight : animation.Animation = null
let mainJumpLeft : animation.Animation = null
let mainRunRight : animation.Animation = null
let mainRunLeft : animation.Animation = null
let flierIdle : animation.Animation = null
let flierFlying : animation.Animation = null
let mainIdleRight : animation.Animation = null
let mainIdleLeft : animation.Animation = null
let doubleJumpSpeed = 0
let canDoubleJump = false
let coinAnimation : animation.Animation = null
let currentLevel = 0
let levelCount = 0
let gravity = 0
let pixelsToMeters = 0
let invincibilityPeriod = 0
let hero : Sprite = null
let mainCrouchRight = null
let mainCrouchLeft = null
hero = sprites.create(assets.image`Mario_IdleRight`, SpriteKind.Player)
invincibilityPeriod = 600
//  how long to pause between each contact with a single enemy
pixelsToMeters = 30
gravity = 9.81 * pixelsToMeters
scene.setBackgroundColor(9)
initializeAnimations()
createPlayer(hero)
levelCount = 3
currentLevel = 0
setLevelTileMap(currentLevel)
// ### Initialize Animations ####
function initializeAnimations() {
    initializeHeroAnimations()
    initializeCoinAnimation()
    initializeFlierAnimations()
}

function initializeCoinAnimation() {
    
    coinAnimation = animation.createAnimation(ActionKind.Idle, 200)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . 5 5 5 5 f f . . . . .
        . . . . 5 5 5 5 5 5 f f . . . .
        . . . . 5 5 4 4 5 5 f f . . . .
        . . . 5 5 4 5 5 f 5 5 f f . . .
        . . . 5 5 4 5 5 f 5 5 f f . . .
        . . . 5 5 4 5 5 f 5 5 f f . . .
        . . . 5 5 4 5 5 f 5 5 f f . . .
        . . . 5 5 4 5 5 f 5 5 f f . . .
        . . . 5 5 4 5 5 f 5 5 f f . . .
        . . . 5 5 4 5 5 f 5 5 f f . . .
        . . . 5 5 4 5 5 f 5 5 f f . . .
        . . . . 5 5 f f 5 5 f f . . . .
        . . . . 5 5 5 5 5 5 f f . . . .
        . . . . . 5 5 5 5 f f . . . . .
        `)
}

function initializeHeroAnimations() {
    animateRun()
    animateIdle()
    animateJumps()
}

function initializeFlierAnimations() {
    
    flierFlying = animation.createAnimation(ActionKind.Flying, 700)
    flierFlying.addAnimationFrame(assets.image`
        squid
        `)
    flierFlying.addAnimationFrame(assets.image`
        squid_fly
        `)
    flierIdle = animation.createAnimation(ActionKind.Idle, 100)
    flierIdle.addAnimationFrame(assets.image`
        squid
        `)
}

function animateIdle() {
    
    mainIdleLeft = animation.createAnimation(ActionKind.IdleLeft, 100)
    animation.attachAnimation(hero, mainIdleLeft)
    mainIdleLeft.addAnimationFrame(assets.image`
        Mario_IdleLeft
        `)
    mainIdleRight = animation.createAnimation(ActionKind.IdleRight, 100)
    animation.attachAnimation(hero, mainIdleRight)
    mainIdleRight.addAnimationFrame(assets.image`
        Mario_IdleRight
        `)
}

function animateRun() {
    
    mainRunLeft = animation.createAnimation(ActionKind.RunningLeft, 200)
    animation.attachAnimation(hero, mainRunLeft)
    mainRunLeft.addAnimationFrame(assets.image`Mario_RunLeft0`)
    mainRunLeft.addAnimationFrame(assets.image`Mario_RunLeft1`)
    mainRunLeft.addAnimationFrame(assets.image`Mario_RunLeft2`)
    mainRunRight = animation.createAnimation(ActionKind.RunningRight, 200)
    animation.attachAnimation(hero, mainRunRight)
    mainRunRight.addAnimationFrame(assets.image`Mario_RunRight0`)
    mainRunRight.addAnimationFrame(assets.image`Mario_RunRight1`)
    mainRunRight.addAnimationFrame(assets.image`Mario_RunRight2`)
}

function animateJumps() {
    
    mainJumpLeft = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(hero, mainJumpLeft)
    mainJumpLeft.addAnimationFrame(assets.image`
        Mario_JumpLeft
        `)
    mainJumpRight = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(hero, mainJumpRight)
    mainJumpRight.addAnimationFrame(assets.image`
        Mario_JumpRight
        `)
}

// ### Collisions ####
scene.onOverlapTile(SpriteKind.Player, myTiles.tile1, function on_overlap_tile(sprite: Sprite, location: tiles.Location) {
    
    info.changeLifeBy(1)
    currentLevel += 1
    if (hasNextLevel()) {
        game.splash("Next level unlocked!")
        setLevelTileMap(currentLevel)
    } else {
        game.over(true, effects.confetti)
    }
    
})
//  Enemy stomp
function overlap_enemy(sprite: Sprite, otherSprite: Sprite) {
    if (sprite.y < otherSprite.y - 8) {
        otherSprite.destroy(effects.ashes, 250)
        otherSprite.vy = -50
        sprite.vy = -2 * pixelsToMeters
        info.changeScoreBy(3)
        music.powerUp.play()
    } else {
        info.changeLifeBy(-1)
        sprite.say("Mamma mia!", invincibilityPeriod)
        music.powerDown.play()
        pause(invincibilityPeriod)
    }
    
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.Bumper, overlap_enemy)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flier, overlap_enemy)
//  Coin
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function overlap_coin(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy(effects.trail, 250)
    otherSprite.y += -3
    info.changeScoreBy(1)
    music.baDing.play()
})
// ### Input ####
controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    attemptJump()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    attemptJump()
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    if (!hero.isHittingTile(CollisionDirection.Bottom)) {
        hero.vy += 80
    }
    
})
function attemptJump() {
    
    //  else if: either fell off a ledge, or double jumping
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        hero.vy = -4 * pixelsToMeters
    } else if (canDoubleJump) {
        doubleJumpSpeed = -5 * pixelsToMeters
        //  Good double jump
        if (hero.vy >= -60) {
            doubleJumpSpeed = -100000000000000000000 * pixelsToMeters
            hero.startEffect(effects.trail, 500)
            scene.cameraShake(2, 250)
        }
        
        hero.vy = doubleJumpSpeed
        canDoubleJump = false
    }
    
}

// ### Level Setup ####
function setLevelTileMap(level: number) {
    clearGame()
    if (level == 0) {
        tiles.setTilemap(tilemap`
            level_0
            `)
    } else if (level == 1) {
        tiles.setTilemap(tilemap`
            level_1
            `)
    } else if (level == 2) {
        tiles.setTilemap(tilemap`
            level_2
            `)
    } else if (level == 3) {
        
    }
    
    initializeLevel(level)
}

function clearGame() {
    for (let value of sprites.allOfKind(SpriteKind.Bumper)) {
        value.destroy()
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Coin)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Goal)) {
        value3.destroy()
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Flier)) {
        value4.destroy()
    }
}

function createEnemies() {
    
    //  enemy that moves back and forth
    for (let value5 of tiles.getTilesByType(myTiles.tile4)) {
        bumper = sprites.create(assets.image`
            goomba
            `, SpriteKind.Bumper)
        tiles.placeOnTile(bumper, value5)
        tiles.setTileAt(value5, myTiles.tile0)
        bumper.ay = gravity
        bumper.vx = 30
    }
    //  enemy that flies at player
    for (let value6 of tiles.getTilesByType(myTiles.tile7)) {
        flier = sprites.create(assets.image`
            squid
            `, SpriteKind.Flier)
        tiles.placeOnTile(flier, value6)
        tiles.setTileAt(value6, myTiles.tile0)
        animation.attachAnimation(flier, flierFlying)
        animation.attachAnimation(flier, flierIdle)
    }
}

function createPlayer(player2: Sprite) {
    player2.ay = gravity
    scene.cameraFollowSprite(player2)
    controller.moveSprite(player2, 100, 0)
    player2.z = 5
    info.setLife(3)
    info.setScore(0)
}

function initializeLevel(level2: number) {
    
    effects.clouds.startScreenEffect()
    playerStartLocation = tiles.getTilesByType(myTiles.tile6)[0]
    tiles.placeOnTile(hero, playerStartLocation)
    tiles.setTileAt(playerStartLocation, myTiles.tile0)
    createEnemies()
    spawnGoals()
}

function hasNextLevel() {
    return currentLevel != levelCount
}

function spawnGoals() {
    
    for (let value7 of tiles.getTilesByType(myTiles.tile5)) {
        coin = sprites.create(assets.image`coin`, SpriteKind.Coin)
        tiles.placeOnTile(coin, value7)
        animation.attachAnimation(coin, coinAnimation)
        animation.setAction(coin, ActionKind.Idle)
        tiles.setTileAt(value7, myTiles.tile0)
    }
}

// ### Update ####
//  bumper movement
game.onUpdate(function on_update() {
    for (let value9 of sprites.allOfKind(SpriteKind.Bumper)) {
        if (value9.isHittingTile(CollisionDirection.Left)) {
            value9.vx = 30
        } else if (value9.isHittingTile(CollisionDirection.Right)) {
            value9.vx = -30
        }
        
    }
})
//  Flier movement
game.onUpdate(function on_update2() {
    for (let value8 of sprites.allOfKind(SpriteKind.Flier)) {
        if (Math.abs(value8.x - hero.x) < 60) {
            if (value8.x - hero.x < -5) {
                value8.vx = 25
            } else if (value8.x - hero.x > 5) {
                value8.vx = -25
            }
            
            if (value8.y - hero.y < -5) {
                value8.vy = 25
            } else if (value8.y - hero.y > 5) {
                value8.vy = -25
            }
            
            animation.setAction(value8, ActionKind.Flying)
        } else {
            value8.vy = -20
            value8.vx = 0
            animation.setAction(value8, ActionKind.Idle)
        }
        
    }
})
//  Reset double jump when standing on wall
game.onUpdate(function on_update3() {
    
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        canDoubleJump = true
    }
    
})
//  set up hero animations
game.onUpdate(function on_update4() {
    
    if (hero.vx < 0) {
        heroFacingLeft = true
    } else if (hero.vx > 0) {
        heroFacingLeft = false
    }
    
    if (hero.isHittingTile(CollisionDirection.Top)) {
        hero.vy = 0
    }
    
    if (hero.vy < 20 && !hero.isHittingTile(CollisionDirection.Bottom)) {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.JumpingLeft)
        } else {
            animation.setAction(hero, ActionKind.JumpingRight)
        }
        
    } else if (hero.vx < 0) {
        animation.setAction(hero, ActionKind.RunningLeft)
    } else if (hero.vx > 0) {
        animation.setAction(hero, ActionKind.RunningRight)
    } else if (heroFacingLeft) {
        animation.setAction(hero, ActionKind.IdleLeft)
    } else {
        animation.setAction(hero, ActionKind.IdleRight)
    }
    
})
