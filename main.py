class ActionKind(Enum):
    RunningLeft = 0
    RunningRight = 1
    Idle = 2
    IdleLeft = 3
    IdleRight = 4
    JumpingLeft = 5
    JumpingRight = 6
    CrouchLeft = 7
    CrouchRight = 8
    Flying = 9
    Jumping = 10
@namespace
class SpriteKind:
    Bumper = SpriteKind.create()
    Flier = SpriteKind.create()
    Goal = SpriteKind.create()
    Coin = SpriteKind.create()


#### Initialize Variables ####
heroFacingLeft = False
coin: Sprite = None
playerStartLocation: tiles.Location = None
flier: Sprite = None
bumper: Sprite = None
mainJumpRight: animation.Animation = None
mainJumpLeft: animation.Animation = None
mainRunRight: animation.Animation = None
mainRunLeft: animation.Animation = None
flierIdle: animation.Animation = None
flierFlying: animation.Animation = None
mainIdleRight: animation.Animation = None
mainIdleLeft: animation.Animation = None
doubleJumpSpeed = 0
canDoubleJump = False
coinAnimation: animation.Animation = None
currentLevel = 0
levelCount = 0
gravity = 0
pixelsToMeters = 0
invincibilityPeriod = 0
hero: Sprite = None
mainCrouchRight = None
mainCrouchLeft = None
hero = sprites.create(assets.image("Mario_IdleRight"), SpriteKind.player)
invincibilityPeriod = 600  # how long to pause between each contact with a single enemy
pixelsToMeters = 30
gravity = 9.81 * pixelsToMeters
scene.set_background_color(9)
initializeAnimations()
createPlayer(hero)
levelCount = 3
currentLevel = 0
setLevelTileMap(currentLevel)


#### Initialize Animations ####
def initializeAnimations():
    initializeHeroAnimations()
    initializeCoinAnimation()
    initializeFlierAnimations()

def initializeCoinAnimation():
    global coinAnimation
    coinAnimation = animation.create_animation(ActionKind.Idle, 200)
    coinAnimation.add_animation_frame(img("""
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
        """))

def initializeHeroAnimations():
    animateRun()
    animateIdle()
    animateJumps()

def initializeFlierAnimations():
    global flierFlying, flierIdle
    flierFlying = animation.create_animation(ActionKind.Flying, 700)
    flierFlying.add_animation_frame(assets.image("""
        squid
        """))
    flierFlying.add_animation_frame(assets.image("""
        squid_fly
        """))
    flierIdle = animation.create_animation(ActionKind.Idle, 100)
    flierIdle.add_animation_frame(assets.image("""
        squid
        """))

def animateIdle():
    global mainIdleLeft, mainIdleRight
    mainIdleLeft = animation.create_animation(ActionKind.IdleLeft, 100)
    animation.attach_animation(hero, mainIdleLeft)
    mainIdleLeft.add_animation_frame(assets.image("""
        Mario_IdleLeft
        """))
    mainIdleRight = animation.create_animation(ActionKind.IdleRight, 100)
    animation.attach_animation(hero, mainIdleRight)
    mainIdleRight.add_animation_frame(assets.image("""
        Mario_IdleRight
        """))

def animateRun():
    global mainRunLeft, mainRunRight
    mainRunLeft = animation.create_animation(ActionKind.RunningLeft, 200)
    animation.attach_animation(hero, mainRunLeft)
    mainRunLeft.add_animation_frame(assets.image("Mario_RunLeft0"))
    mainRunLeft.add_animation_frame(assets.image("Mario_RunLeft1"))
    mainRunLeft.add_animation_frame(assets.image("Mario_RunLeft2"))
    mainRunRight = animation.create_animation(ActionKind.RunningRight, 200)
    animation.attach_animation(hero, mainRunRight)
    mainRunRight.add_animation_frame(assets.image("Mario_RunRight0"))
    mainRunRight.add_animation_frame(assets.image("Mario_RunRight1"))
    mainRunRight.add_animation_frame(assets.image("Mario_RunRight2"))

def animateJumps():
    global mainJumpLeft, mainJumpRight
    mainJumpLeft = animation.create_animation(ActionKind.JumpingLeft, 100)
    animation.attach_animation(hero, mainJumpLeft)
    mainJumpLeft.add_animation_frame(assets.image("""
        Mario_JumpLeft
        """))
    mainJumpRight = animation.create_animation(ActionKind.JumpingRight, 100)
    animation.attach_animation(hero, mainJumpRight)
    mainJumpRight.add_animation_frame(assets.image("""
        Mario_JumpRight
        """))


#### Collisions ####
def on_overlap_tile(sprite, location):
    global currentLevel
    info.change_life_by(1)
    currentLevel += 1
    if hasNextLevel():
        game.splash("Next level unlocked!")
        setLevelTileMap(currentLevel)
    else:
        game.over(True, effects.confetti)
scene.on_overlap_tile(SpriteKind.player, myTiles.tile1, on_overlap_tile)

# Enemy stomp
def overlap_enemy(sprite, otherSprite):
    if sprite.y < otherSprite.y - 8:
        otherSprite.destroy(effects.ashes, 250)
        otherSprite.vy = -50
        sprite.vy = -2 * pixelsToMeters
        info.change_score_by(3)
        music.power_up.play()
    else:
        info.change_life_by(-1)
        sprite.say("Mamma mia!", invincibilityPeriod)
        music.power_down.play()
        pause(invincibilityPeriod)
sprites.on_overlap(SpriteKind.player, SpriteKind.Bumper, overlap_enemy)
sprites.on_overlap(SpriteKind.player, SpriteKind.Flier, overlap_enemy)

# Coin
def overlap_coin(sprite, otherSprite):
    otherSprite.destroy(effects.trail, 250)
    otherSprite.y += -3
    info.change_score_by(1)
    music.ba_ding.play()
sprites.on_overlap(SpriteKind.player, SpriteKind.Coin, overlap_coin)


#### Input ####
def on_up_pressed():
    attemptJump()
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_a_pressed():
    attemptJump()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_down_pressed():
    if not (hero.is_hitting_tile(CollisionDirection.BOTTOM)):
        hero.vy += 80
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def attemptJump():
    global doubleJumpSpeed, canDoubleJump
    # else if: either fell off a ledge, or double jumping
    if hero.is_hitting_tile(CollisionDirection.BOTTOM):
        hero.vy = -4 * pixelsToMeters
    elif canDoubleJump:
        doubleJumpSpeed = -5 * pixelsToMeters
        # Good double jump
        if hero.vy >= -60:
            doubleJumpSpeed = -100000000000000000000 * pixelsToMeters
            hero.start_effect(effects.trail, 500)
            scene.camera_shake(2, 250)
        hero.vy = doubleJumpSpeed
        canDoubleJump = False


#### Level Setup ####
def setLevelTileMap(level: number):
    clearGame()
    if level == 0:
        tiles.set_tilemap(tilemap("""
            level_0
            """))
    elif level == 1:
        tiles.set_tilemap(tilemap("""
            level_1
            """))
    elif level == 2:
        tiles.set_tilemap(tilemap("""
            level_2
            """))
    elif level == 3:
        pass
    initializeLevel(level)

def clearGame():
    for value in sprites.all_of_kind(SpriteKind.Bumper):
        value.destroy()
    for value2 in sprites.all_of_kind(SpriteKind.Coin):
        value2.destroy()
    for value3 in sprites.all_of_kind(SpriteKind.Goal):
        value3.destroy()
    for value4 in sprites.all_of_kind(SpriteKind.Flier):
        value4.destroy()

def createEnemies():
    global bumper, flier
    # enemy that moves back and forth
    for value5 in tiles.get_tiles_by_type(myTiles.tile4):
        bumper = sprites.create(assets.image("""
            goomba
            """), SpriteKind.Bumper)
        tiles.place_on_tile(bumper, value5)
        tiles.set_tile_at(value5, myTiles.tile0)
        bumper.ay = gravity
        bumper.vx = 30
    # enemy that flies at player
    for value6 in tiles.get_tiles_by_type(myTiles.tile7):
        flier = sprites.create(assets.image("""
            squid
            """), SpriteKind.Flier)
        tiles.place_on_tile(flier, value6)
        tiles.set_tile_at(value6, myTiles.tile0)
        animation.attach_animation(flier, flierFlying)
        animation.attach_animation(flier, flierIdle)

def createPlayer(player2: Sprite):
    player2.ay = gravity
    scene.camera_follow_sprite(player2)
    controller.move_sprite(player2, 100, 0)
    player2.z = 5
    info.set_life(3)
    info.set_score(0)

def initializeLevel(level2: number):
    global playerStartLocation
    effects.clouds.start_screen_effect()
    playerStartLocation = tiles.get_tiles_by_type(myTiles.tile6)[0]
    tiles.place_on_tile(hero, playerStartLocation)
    tiles.set_tile_at(playerStartLocation, myTiles.tile0)
    createEnemies()
    spawnGoals()

def hasNextLevel():
    return currentLevel != levelCount

def spawnGoals():
    global coin
    for value7 in tiles.get_tiles_by_type(myTiles.tile5):
        coin = sprites.create(assets.image("coin"), SpriteKind.Coin)
        tiles.place_on_tile(coin, value7)
        animation.attach_animation(coin, coinAnimation)
        animation.set_action(coin, ActionKind.Idle)
        tiles.set_tile_at(value7, myTiles.tile0)


#### Update ####
# bumper movement
def on_update():
    for value9 in sprites.all_of_kind(SpriteKind.Bumper):
        if value9.is_hitting_tile(CollisionDirection.LEFT):
            value9.vx = 30
        elif value9.is_hitting_tile(CollisionDirection.RIGHT):
            value9.vx = -30
game.on_update(on_update)

# Flier movement
def on_update2():
    for value8 in sprites.all_of_kind(SpriteKind.Flier):
        if abs(value8.x - hero.x) < 60:
            if value8.x - hero.x < -5:
                value8.vx = 25
            elif value8.x - hero.x > 5:
                value8.vx = -25
            if value8.y - hero.y < -5:
                value8.vy = 25
            elif value8.y - hero.y > 5:
                value8.vy = -25
            animation.set_action(value8, ActionKind.Flying)
        else:
            value8.vy = -20
            value8.vx = 0
            animation.set_action(value8, ActionKind.Idle)
game.on_update(on_update2)

# Reset double jump when standing on wall
def on_update3():
    global canDoubleJump
    if hero.is_hitting_tile(CollisionDirection.BOTTOM):
        canDoubleJump = True
game.on_update(on_update3)

# set up hero animations
def on_update4():
    global heroFacingLeft
    if hero.vx < 0:
        heroFacingLeft = True
    elif hero.vx > 0:
        heroFacingLeft = False
    if hero.is_hitting_tile(CollisionDirection.TOP):
        hero.vy = 0
    if hero.vy < 20 and not (hero.is_hitting_tile(CollisionDirection.BOTTOM)):
        if heroFacingLeft:
            animation.set_action(hero, ActionKind.JumpingLeft)
        else:
            animation.set_action(hero, ActionKind.JumpingRight)
    elif hero.vx < 0:
        animation.set_action(hero, ActionKind.RunningLeft)
    elif hero.vx > 0:
        animation.set_action(hero, ActionKind.RunningRight)
    else:
        if heroFacingLeft:
            animation.set_action(hero, ActionKind.IdleLeft)
        else:
            animation.set_action(hero, ActionKind.IdleRight)
game.on_update(on_update4)

