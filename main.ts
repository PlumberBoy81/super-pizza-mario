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
let luigiIdleLeft : animation.Animation = null
let luigiIdleRight : animation.Animation = null
let luigiJumpLeft : animation.Animation = null
let luigiJumpRight : animation.Animation = null
let luigiRunLeft : animation.Animation = null
let luigiRunRight : animation.Animation = null
let warioIdleLeft : animation.Animation = null
let warioIdleRight : animation.Animation = null
let warioJumpLeft : animation.Animation = null
let warioJumpRight : animation.Animation = null
let warioRunLeft : animation.Animation = null
let warioRunRight : animation.Animation = null
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
invincibilityPeriod = 600
//  how long to pause between each contact with a single enemy
pixelsToMeters = 30
gravity = 9.81 * pixelsToMeters
let currentPlayer = "Mario"
//  Track current character
hero = sprites.create(assets.image`Mario_IdleRight`, SpriteKind.Player)
//  Initialize as Mario
scene.setBackgroundColor(9)
initializeAnimations()
createPlayer(hero)
levelCount = 4
currentLevel = 0
setLevelTileMap(currentLevel)
// ### Initialize Animations ####
function initializeAnimations() {
    initializeHeroAnimations()
    initializeCoinAnimation()
    initializeFlierAnimations()
    initializeLuigiAnimations()
    //  Initialize Luigi animations
    initializeWarioAnimations()
}

//  Initialize Wario animations
function initializeCoinAnimation() {
    
    coinAnimation = animation.createAnimation(ActionKind.Idle, 200)
    coinAnimation.addAnimationFrame(assets.image`
         Coin
         `)
}

function initializeHeroAnimations() {
    animateRun()
    //  Initialize Mario's run animations
    animateIdle()
    //  Initialize Mario's idle animations
    animateJumps()
}

//  Initialize Mario's jump animations
function initializeLuigiAnimations() {
    
    luigiIdleLeft = animation.createAnimation(ActionKind.IdleLeft, 100)
    luigiIdleLeft.addAnimationFrame(assets.image`Luigi_IdleLeft`)
    luigiIdleRight = animation.createAnimation(ActionKind.IdleRight, 100)
    luigiIdleRight.addAnimationFrame(assets.image`Luigi_IdleRight`)
    luigiJumpLeft = animation.createAnimation(ActionKind.JumpingLeft, 100)
    luigiJumpLeft.addAnimationFrame(assets.image`Luigi_JumpLeft`)
    luigiJumpRight = animation.createAnimation(ActionKind.JumpingRight, 100)
    luigiJumpRight.addAnimationFrame(assets.image`Luigi_JumpRight`)
    luigiRunLeft = animation.createAnimation(ActionKind.RunningLeft, 200)
    animation.attachAnimation(hero, luigiRunLeft)
    luigiRunLeft.addAnimationFrame(assets.image`Luigi_RunLeft0`)
    luigiRunLeft.addAnimationFrame(assets.image`Luigi_RunLeft1`)
    luigiRunLeft.addAnimationFrame(assets.image`Luigi_RunLeft2`)
    luigiRunRight = animation.createAnimation(ActionKind.RunningRight, 200)
    animation.attachAnimation(hero, luigiRunRight)
    luigiRunRight.addAnimationFrame(assets.image`Luigi_RunRight0`)
    luigiRunRight.addAnimationFrame(assets.image`Luigi_RunRight1`)
    luigiRunRight.addAnimationFrame(assets.image`Luigi_RunRight2`)
}

//  Initialize Wario animations
function initializeWarioAnimations() {
    
    warioIdleLeft = animation.createAnimation(ActionKind.IdleLeft, 100)
    warioIdleLeft.addAnimationFrame(assets.image`Wario_IdleLeft`)
    warioIdleRight = animation.createAnimation(ActionKind.IdleRight, 100)
    warioIdleRight.addAnimationFrame(assets.image`Wario_IdleRight`)
    warioJumpLeft = animation.createAnimation(ActionKind.JumpingLeft, 100)
    warioJumpLeft.addAnimationFrame(assets.image`Wario_JumpLeft`)
    warioJumpRight = animation.createAnimation(ActionKind.JumpingRight, 100)
    warioJumpRight.addAnimationFrame(assets.image`Wario_JumpRight`)
    warioRunLeft = animation.createAnimation(ActionKind.RunningLeft, 200)
    animation.attachAnimation(hero, warioRunLeft)
    warioRunLeft.addAnimationFrame(assets.image`Wario_RunLeft0`)
    warioRunLeft.addAnimationFrame(assets.image`Wario_RunLeft1`)
    warioRunLeft.addAnimationFrame(assets.image`Wario_RunLeft2`)
    warioRunRight = animation.createAnimation(ActionKind.RunningRight, 200)
    animation.attachAnimation(hero, warioRunRight)
    warioRunRight.addAnimationFrame(assets.image`Wario_RunRight0`)
    warioRunRight.addAnimationFrame(assets.image`Wario_RunRight1`)
    warioRunRight.addAnimationFrame(assets.image`Wario_RunRight2`)
}

function initializeFlierAnimations() {
    
    flierFlying = animation.createAnimation(ActionKind.Flying, 700)
    flierFlying.addAnimationFrame(assets.image`squid`)
    flierFlying.addAnimationFrame(assets.image`squid_fly`)
    flierIdle = animation.createAnimation(ActionKind.Idle, 100)
    flierIdle.addAnimationFrame(assets.image`squid`)
}

function animateIdle() {
    
    mainIdleLeft = animation.createAnimation(ActionKind.IdleLeft, 100)
    animation.attachAnimation(hero, mainIdleLeft)
    mainIdleLeft.addAnimationFrame(assets.image`Mario_IdleLeft`)
    mainIdleRight = animation.createAnimation(ActionKind.IdleRight, 100)
    animation.attachAnimation(hero, mainIdleRight)
    mainIdleRight.addAnimationFrame(assets.image`Mario_IdleRight`)
}

function animateRun() {
    
    mainRunLeft = animation.createAnimation(ActionKind.RunningLeft, 200)
    animation.attachAnimation(hero, mainRunLeft)
    mainRunLeft.addAnimationFrame(assets.image`Mario_RunLeft0`)
    mainRunLeft.addAnimationFrame(assets.image`Mario_RunLeft1`)
    mainRunLeft.addAnimationFrame(assets.image`Mario_RunLeft2`)
    mainRunRight = animation.createAnimation(ActionKind.RunningRight, 200)
    animation.attachAnimation(hero, mainRunRight)
    mainRunRight.addAnimationFrame(assets.image`
        Mario_RunRight0
        `)
    mainRunRight.addAnimationFrame(assets.image`
         Mario_RunRight1
         `)
    mainRunRight.addAnimationFrame(assets.image`
         Mario_RunRight2
         `)
}

function animateJumps() {
    
    mainJumpLeft = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(hero, mainJumpLeft)
    mainJumpLeft.addAnimationFrame(assets.image`Mario_JumpLeft`)
    mainJumpRight = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(hero, mainJumpRight)
    mainJumpRight.addAnimationFrame(assets.image`Mario_JumpRight`)
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
        sprite.say("Ouch!", invincibilityPeriod)
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
//  Character Switching
controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    switchCharacter()
})
function switchCharacter() {
    
    let current_x = hero.x
    let current_y = hero.y
    //  Save the current score and life count
    let current_score = info.score()
    let current_life = info.life()
    if (currentPlayer == "Mario") {
        hero.destroy()
        //  Remove the current sprite
        hero = sprites.create(assets.image`Luigi_IdleRight`, SpriteKind.Player)
        //  Switch to Luigi
        attachLuigiAnimations()
        currentPlayer = "Luigi"
        createPlayer(hero)
    } else if (currentPlayer == "Luigi") {
        hero.destroy()
        //  Remove the current sprite
        hero = sprites.create(assets.image`Wario_IdleRight`, SpriteKind.Player)
        //  Switch to Wario
        attachWarioAnimations()
        currentPlayer = "Wario"
        createPlayer(hero)
    } else {
        //  Switch back to Mario
        hero.destroy()
        //  Remove the current sprite
        hero = sprites.create(assets.image`Mario_IdleRight`, SpriteKind.Player)
        //  Switch to Mario
        attachMarioAnimations()
        currentPlayer = "Mario"
        createPlayer(hero)
    }
    
    //  Set the new player's position to the previous position
    hero.setPosition(current_x, current_y)
    //  Restore the score and life count to the saved values
    info.setScore(current_score)
    info.setLife(current_life)
}

function attachLuigiAnimations() {
    animation.attachAnimation(hero, luigiIdleLeft)
    //  Attach Luigi animations
    animation.attachAnimation(hero, luigiIdleRight)
    animation.attachAnimation(hero, luigiJumpLeft)
    animation.attachAnimation(hero, luigiJumpRight)
    animation.attachAnimation(hero, luigiRunLeft)
    //  Attach Luigi run animations
    animation.attachAnimation(hero, luigiRunRight)
}

function attachWarioAnimations() {
    animation.attachAnimation(hero, warioIdleLeft)
    //  Attach Wario animations
    animation.attachAnimation(hero, warioIdleRight)
    animation.attachAnimation(hero, warioJumpLeft)
    animation.attachAnimation(hero, warioJumpRight)
    animation.attachAnimation(hero, warioRunLeft)
    animation.attachAnimation(hero, warioRunRight)
}

function attachMarioAnimations() {
    animation.attachAnimation(hero, mainIdleLeft)
    //  Attach Mario animations
    animation.attachAnimation(hero, mainIdleRight)
    animation.attachAnimation(hero, mainJumpLeft)
    animation.attachAnimation(hero, mainJumpRight)
    animation.attachAnimation(hero, mainRunLeft)
    //  Attach Mario run animations
    animation.attachAnimation(hero, mainRunRight)
}

function attemptJump() {
    
    let jumpStrength = currentPlayer == "Mario" ? -4.25 * pixelsToMeters : (currentPlayer == "Luigi" ? -4.8 * pixelsToMeters : -3.75 * pixelsToMeters)
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        hero.vy = jumpStrength
    } else if (canDoubleJump) {
        doubleJumpSpeed = -4.25 * pixelsToMeters
        if (hero.vy >= -60) {
            doubleJumpSpeed = -4.25 * pixelsToMeters
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
        tiles.setTilemap(tilemap`level_0`)
    } else if (level == 1) {
        tiles.setTilemap(tilemap`level_1`)
    } else if (level == 2) {
        tiles.setTilemap(tilemap`level_2`)
    } else if (level == 3) {
        tiles.setTilemap(tilemap`level_3`)
    } else if (level == 4) {
        
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
    
    for (let value5 of tiles.getTilesByType(myTiles.tile4)) {
        bumper = sprites.create(assets.image`goomba`, SpriteKind.Bumper)
        tiles.placeOnTile(bumper, value5)
        tiles.setTileAt(value5, myTiles.tile0)
        bumper.ay = gravity
        bumper.vx = 30
    }
    for (let value6 of tiles.getTilesByType(myTiles.tile7)) {
        flier = sprites.create(assets.image`squid`, SpriteKind.Flier)
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
game.onUpdate(function on_update() {
    for (let value9 of sprites.allOfKind(SpriteKind.Bumper)) {
        if (value9.isHittingTile(CollisionDirection.Left)) {
            value9.vx = 30
        } else if (value9.isHittingTile(CollisionDirection.Right)) {
            value9.vx = -30
        }
        
    }
})
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
//  Set up hero animations
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
        if (currentPlayer == "Luigi") {
            if (heroFacingLeft) {
                animation.setAction(hero, ActionKind.JumpingLeft)
            } else {
                //  Luigi jump animation
                animation.setAction(hero, ActionKind.JumpingRight)
            }
            
        } else if (currentPlayer == "Wario") {
            //  Luigi jump animation
            if (heroFacingLeft) {
                animation.setAction(hero, ActionKind.JumpingLeft)
            } else {
                //  Wario jump animation
                animation.setAction(hero, ActionKind.JumpingRight)
            }
            
        } else if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.JumpingLeft)
        } else {
            animation.setAction(hero, ActionKind.JumpingRight)
        }
        
    } else if (hero.vx < 0) {
        if (currentPlayer == "Luigi") {
            animation.setAction(hero, ActionKind.RunningLeft)
        } else if (currentPlayer == "Wario") {
            animation.setAction(hero, ActionKind.RunningLeft)
        } else {
            //  Wario runs
            animation.setAction(hero, ActionKind.RunningLeft)
        }
        
    } else if (hero.vx > 0) {
        if (currentPlayer == "Luigi") {
            animation.setAction(hero, ActionKind.RunningRight)
        } else if (currentPlayer == "Wario") {
            animation.setAction(hero, ActionKind.RunningRight)
        } else {
            //  Wario runs
            animation.setAction(hero, ActionKind.RunningRight)
        }
        
    } else if (heroFacingLeft) {
        if (currentPlayer == "Luigi") {
            animation.setAction(hero, ActionKind.IdleLeft)
        } else {
            animation.setAction(hero, ActionKind.IdleLeft)
        }
        
    } else if (currentPlayer == "Luigi") {
        animation.setAction(hero, ActionKind.IdleRight)
    } else {
        animation.setAction(hero, ActionKind.IdleRight)
    }
    
})
