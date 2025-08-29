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
//  Mario animations (not global objects; created & attached per sprite)
//  Luigi animations will be created & attached per sprite as well
let flierIdle : animation.Animation = null
let flierFlying : animation.Animation = null
let coinAnimation : animation.Animation = null
let currentLevel = 0
let levelCount = 0
let gravity = 0
let pixelsToMeters = 0
let invincibilityPeriod = 0
let hero : Sprite = null
let mainCrouchRight = null
let mainCrouchLeft = null
//  Double-jump state variables
let doubleJumpSpeed = 0
let canDoubleJump = true
//  Character-specific gameplay parameters
let heroIsLuigi = false
let mario_speed = 100
let luigi_speed = 120
//  Luigi slightly faster
let mario_jump_multiplier = -4.0
//  base jump multiplier (will be multiplied by pixelsToMeters)
let luigi_jump_multiplier = -5.0
//  Luigi higher jump
let mario_traction = 0.8
//  higher traction => quicker stopping
let luigi_traction = 0.95
//  lower traction => more slippery (keeps speed more)
let current_speed = mario_speed
let current_jump_multiplier = mario_jump_multiplier
let current_traction = mario_traction
//  Keep track of currently set animation action to avoid restarting animations every frame
let heroCurrentAction = ActionKind.IdleRight
//  Create the initial hero sprite (Mario by default)
hero = sprites.create(assets.image`Mario_IdleRight`, SpriteKind.Player)
invincibilityPeriod = 600
//  how long to pause between each contact with a single enemy
pixelsToMeters = 30
gravity = 9.81 * pixelsToMeters
scene.setBackgroundColor(9)
// ### Animation initialization and helpers ####
function initializeAnimations() {
    initializeCoinAnimation()
    initializeFlierAnimations()
    //  Attach Mario animations to the initial hero (Mario)
    attach_mario_animations_to(hero)
    //  initial action
    
    heroCurrentAction = ActionKind.IdleRight
    animation.setAction(hero, heroCurrentAction)
}

function initializeCoinAnimation() {
    
    coinAnimation = animation.createAnimation(ActionKind.Idle, 200)
    coinAnimation.addAnimationFrame(assets.image`
        Coin
        `)
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

function attach_mario_animations_to(s: Sprite) {
    //  Idle
    let mainIdleLeft = animation.createAnimation(ActionKind.IdleLeft, 100)
    animation.attachAnimation(s, mainIdleLeft)
    mainIdleLeft.addAnimationFrame(assets.image`Mario_IdleLeft`)
    let mainIdleRight = animation.createAnimation(ActionKind.IdleRight, 100)
    animation.attachAnimation(s, mainIdleRight)
    mainIdleRight.addAnimationFrame(assets.image`Mario_IdleRight`)
    //  Run
    let mainRunLeft = animation.createAnimation(ActionKind.RunningLeft, 200)
    animation.attachAnimation(s, mainRunLeft)
    mainRunLeft.addAnimationFrame(assets.image`Mario_RunLeft0`)
    mainRunLeft.addAnimationFrame(assets.image`Mario_RunLeft1`)
    mainRunLeft.addAnimationFrame(assets.image`Mario_RunLeft2`)
    let mainRunRight = animation.createAnimation(ActionKind.RunningRight, 200)
    animation.attachAnimation(s, mainRunRight)
    mainRunRight.addAnimationFrame(assets.image`Mario_RunRight0`)
    mainRunRight.addAnimationFrame(assets.image`Mario_RunRight1`)
    mainRunRight.addAnimationFrame(assets.image`Mario_RunRight2`)
    //  Jump
    let mainJumpLeft = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(s, mainJumpLeft)
    mainJumpLeft.addAnimationFrame(assets.image`Mario_JumpLeft`)
    let mainJumpRight = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(s, mainJumpRight)
    mainJumpRight.addAnimationFrame(assets.image`Mario_JumpRight`)
}

function attach_luigi_animations_to(s: Sprite) {
    //  Idle
    let luigiIdleLeft = animation.createAnimation(ActionKind.IdleLeft, 100)
    animation.attachAnimation(s, luigiIdleLeft)
    luigiIdleLeft.addAnimationFrame(assets.image`Luigi_IdleLeft`)
    let luigiIdleRight = animation.createAnimation(ActionKind.IdleRight, 100)
    animation.attachAnimation(s, luigiIdleRight)
    luigiIdleRight.addAnimationFrame(assets.image`Luigi_IdleRight`)
    //  Run (3 frames each direction)
    let luigiRunLeft = animation.createAnimation(ActionKind.RunningLeft, 180)
    animation.attachAnimation(s, luigiRunLeft)
    luigiRunLeft.addAnimationFrame(assets.image`Luigi_RunLeft0`)
    luigiRunLeft.addAnimationFrame(assets.image`Luigi_RunLeft1`)
    luigiRunLeft.addAnimationFrame(assets.image`Luigi_RunLeft2`)
    let luigiRunRight = animation.createAnimation(ActionKind.RunningRight, 180)
    animation.attachAnimation(s, luigiRunRight)
    luigiRunRight.addAnimationFrame(assets.image`Luigi_RunRight0`)
    luigiRunRight.addAnimationFrame(assets.image`Luigi_RunRight1`)
    luigiRunRight.addAnimationFrame(assets.image`Luigi_RunRight2`)
    //  Jump
    let luigiJumpLeft = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(s, luigiJumpLeft)
    luigiJumpLeft.addAnimationFrame(assets.image`Luigi_JumpLeft`)
    let luigiJumpRight = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(s, luigiJumpRight)
    luigiJumpRight.addAnimationFrame(assets.image`Luigi_JumpRight`)
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
    
    //  ground jump
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        hero.vy = current_jump_multiplier * pixelsToMeters
    } else if (canDoubleJump) {
        doubleJumpSpeed = -5 * pixelsToMeters
        //  Good double jump
        if (hero.vy >= -60) {
            doubleJumpSpeed = -4 * pixelsToMeters
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
        tiles.setTilemap(tilemap`
            level_3
            `)
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

function createPlayer(player2: Sprite, speed: number = 100, initialize_stats: boolean = true) {
    
    player2.ay = gravity
    scene.cameraFollowSprite(player2)
    controller.moveSprite(player2, speed, 0)
    player2.z = 5
    //  Only initialize life/score when creating initial player
    if (initialize_stats) {
        info.setLife(3)
        info.setScore(0)
    }
    
    //  Reset double-jump availability when creating player
    canDoubleJump = true
    //  Reset current animation action state for the new sprite
    if (heroFacingLeft) {
        heroCurrentAction = ActionKind.IdleLeft
    } else {
        heroCurrentAction = ActionKind.IdleRight
    }
    
    animation.setAction(player2, heroCurrentAction)
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

// ### Switching characters (Mario <-> Luigi) ####
function switch_character() {
    let new_image: Image;
    
    //  Save state
    let saved_x = hero.x
    let saved_y = hero.y
    let saved_vx = hero.vx
    let saved_vy = hero.vy
    let saved_life = info.life()
    let saved_score = info.score()
    let saved_facing_left = heroFacingLeft
    //  Destroy old hero sprite
    hero.destroy()
    //  Toggle
    heroIsLuigi = !heroIsLuigi
    //  Create new sprite with appropriate idle image depending on facing
    if (heroIsLuigi) {
        //  create Luigi
        if (saved_facing_left) {
            new_image = assets.image`Luigi_IdleLeft`
            heroCurrentAction = ActionKind.IdleLeft
        } else {
            new_image = assets.image`Luigi_IdleRight`
            heroCurrentAction = ActionKind.IdleRight
        }
        
        hero = sprites.create(new_image, SpriteKind.Player)
        //  Set character-specific parameters
        current_speed = luigi_speed
        current_jump_multiplier = luigi_jump_multiplier
        current_traction = luigi_traction
        //  Attach animations for Luigi
        attach_luigi_animations_to(hero)
    } else {
        //  create Mario
        if (saved_facing_left) {
            new_image = assets.image`Mario_IdleLeft`
            heroCurrentAction = ActionKind.IdleLeft
        } else {
            new_image = assets.image`Mario_IdleRight`
            heroCurrentAction = ActionKind.IdleRight
        }
        
        hero = sprites.create(new_image, SpriteKind.Player)
        current_speed = mario_speed
        current_jump_multiplier = mario_jump_multiplier
        current_traction = mario_traction
        attach_mario_animations_to(hero)
    }
    
    //  Restore position and motion
    hero.x = saved_x
    hero.y = saved_y
    hero.vx = saved_vx
    hero.vy = saved_vy
    //  Recreate player physics & controller binding without resetting life/score
    createPlayer(hero, current_speed, false)
    //  Restore life & score
    info.setLife(saved_life)
    info.setScore(saved_score)
    //  Ensure the hero has the correct current animation action set
    animation.setAction(hero, heroCurrentAction)
}

controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    switch_character()
})
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
//  Reset double jump when standing on ground
game.onUpdate(function on_update3() {
    
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        canDoubleJump = true
    }
    
})
//  set up hero animations and apply traction
game.onUpdate(function on_update4() {
    let desired_action: number;
    let left_pressed: boolean;
    let right_pressed: boolean;
    
    //  Update facing based on vx
    if (hero.vx < 0) {
        heroFacingLeft = true
    } else if (hero.vx > 0) {
        heroFacingLeft = false
    }
    
    //  Prevent sticking into the top of tiles
    if (hero.isHittingTile(CollisionDirection.Top)) {
        hero.vy = 0
    }
    
    //  Decide desired action. Use grounded check (is_hitting_tile(BOTTOM)) to determine airborne.
    let grounded = hero.isHittingTile(CollisionDirection.Bottom)
    if (!grounded) {
        //  If airborne, always use jumping animation (prevents flicker between run and jump)
        if (heroFacingLeft) {
            desired_action = ActionKind.JumpingLeft
        } else {
            desired_action = ActionKind.JumpingRight
        }
        
    } else if (hero.vx < 0) {
        desired_action = ActionKind.RunningLeft
    } else if (hero.vx > 0) {
        desired_action = ActionKind.RunningRight
    } else if (heroFacingLeft) {
        desired_action = ActionKind.IdleLeft
    } else {
        desired_action = ActionKind.IdleRight
    }
    
    //  Only call set_action when the action changes to avoid restarting animations and causing visual glitches
    if (desired_action != heroCurrentAction) {
        animation.setAction(hero, desired_action)
        heroCurrentAction = desired_action
    }
    
    //  Traction: when on ground and player isn't pressing left/right, apply friction
    if (grounded) {
        left_pressed = controller.left.isPressed()
        right_pressed = controller.right.isPressed()
        if (!left_pressed && !right_pressed) {
            //  apply traction (slows the hero)
            hero.vx = Math.trunc(hero.vx * current_traction)
            //  snap to zero when very small
            if (Math.abs(hero.vx) < 5) {
                hero.vx = 0
            }
            
        }
        
    }
    
})
// ### Setup initial game state ####
initializeAnimations()
//  createPlayer called to set initial controls & stats (Mario)
createPlayer(hero, current_speed, true)
levelCount = 4
currentLevel = 0
setLevelTileMap(currentLevel)
