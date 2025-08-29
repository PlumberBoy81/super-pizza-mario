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
# Mario animations (not global objects; created & attached per sprite)
# Luigi animations will be created & attached per sprite as well

flierIdle: animation.Animation = None
flierFlying: animation.Animation = None
coinAnimation: animation.Animation = None
currentLevel = 0
levelCount = 0
gravity = 0
pixelsToMeters = 0
invincibilityPeriod = 0
hero: Sprite = None
mainCrouchRight = None
mainCrouchLeft = None

# Double-jump state variables
doubleJumpSpeed = 0
canDoubleJump = True

# Character-specific gameplay parameters
heroIsLuigi = False
mario_speed = 100
luigi_speed = 120               # Luigi slightly faster
mario_jump_multiplier = -4.0    # base jump multiplier (will be multiplied by pixelsToMeters)
luigi_jump_multiplier = -5.0    # Luigi higher jump
mario_traction = 0.8            # higher traction => quicker stopping
luigi_traction = 0.95           # lower traction => more slippery (keeps speed more)
current_speed = mario_speed
current_jump_multiplier = mario_jump_multiplier
current_traction = mario_traction

# Keep track of currently set animation action to avoid restarting animations every frame
heroCurrentAction = ActionKind.IdleRight

# Create the initial hero sprite (Mario by default)
hero = sprites.create(assets.image("Mario_IdleRight"), SpriteKind.player)
invincibilityPeriod = 600  # how long to pause between each contact with a single enemy
pixelsToMeters = 30
gravity = 9.81 * pixelsToMeters
scene.set_background_color(9)


#### Animation initialization and helpers ####
def initializeAnimations():
    initializeCoinAnimation()
    initializeFlierAnimations()
    # Attach Mario animations to the initial hero (Mario)
    attach_mario_animations_to(hero)
    # initial action
    global heroCurrentAction
    heroCurrentAction = ActionKind.IdleRight
    animation.set_action(hero, heroCurrentAction)


def initializeCoinAnimation():
    global coinAnimation
    coinAnimation = animation.create_animation(ActionKind.Idle, 200)
    coinAnimation.add_animation_frame(assets.image("""
        Coin
        """))


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


def attach_mario_animations_to(s: Sprite):
    # Idle
    mainIdleLeft = animation.create_animation(ActionKind.IdleLeft, 100)
    animation.attach_animation(s, mainIdleLeft)
    mainIdleLeft.add_animation_frame(assets.image("Mario_IdleLeft"))

    mainIdleRight = animation.create_animation(ActionKind.IdleRight, 100)
    animation.attach_animation(s, mainIdleRight)
    mainIdleRight.add_animation_frame(assets.image("Mario_IdleRight"))

    # Run
    mainRunLeft = animation.create_animation(ActionKind.RunningLeft, 200)
    animation.attach_animation(s, mainRunLeft)
    mainRunLeft.add_animation_frame(assets.image("Mario_RunLeft0"))
    mainRunLeft.add_animation_frame(assets.image("Mario_RunLeft1"))
    mainRunLeft.add_animation_frame(assets.image("Mario_RunLeft2"))

    mainRunRight = animation.create_animation(ActionKind.RunningRight, 200)
    animation.attach_animation(s, mainRunRight)
    mainRunRight.add_animation_frame(assets.image("Mario_RunRight0"))
    mainRunRight.add_animation_frame(assets.image("Mario_RunRight1"))
    mainRunRight.add_animation_frame(assets.image("Mario_RunRight2"))

    # Jump
    mainJumpLeft = animation.create_animation(ActionKind.JumpingLeft, 100)
    animation.attach_animation(s, mainJumpLeft)
    mainJumpLeft.add_animation_frame(assets.image("Mario_JumpLeft"))

    mainJumpRight = animation.create_animation(ActionKind.JumpingRight, 100)
    animation.attach_animation(s, mainJumpRight)
    mainJumpRight.add_animation_frame(assets.image("Mario_JumpRight"))


def attach_luigi_animations_to(s: Sprite):
    # Idle
    luigiIdleLeft = animation.create_animation(ActionKind.IdleLeft, 100)
    animation.attach_animation(s, luigiIdleLeft)
    luigiIdleLeft.add_animation_frame(assets.image("Luigi_IdleLeft"))

    luigiIdleRight = animation.create_animation(ActionKind.IdleRight, 100)
    animation.attach_animation(s, luigiIdleRight)
    luigiIdleRight.add_animation_frame(assets.image("Luigi_IdleRight"))

    # Run (3 frames each direction)
    luigiRunLeft = animation.create_animation(ActionKind.RunningLeft, 180)
    animation.attach_animation(s, luigiRunLeft)
    luigiRunLeft.add_animation_frame(assets.image("Luigi_RunLeft0"))
    luigiRunLeft.add_animation_frame(assets.image("Luigi_RunLeft1"))
    luigiRunLeft.add_animation_frame(assets.image("Luigi_RunLeft2"))

    luigiRunRight = animation.create_animation(ActionKind.RunningRight, 180)
    animation.attach_animation(s, luigiRunRight)
    luigiRunRight.add_animation_frame(assets.image("Luigi_RunRight0"))
    luigiRunRight.add_animation_frame(assets.image("Luigi_RunRight1"))
    luigiRunRight.add_animation_frame(assets.image("Luigi_RunRight2"))

    # Jump
    luigiJumpLeft = animation.create_animation(ActionKind.JumpingLeft, 100)
    animation.attach_animation(s, luigiJumpLeft)
    luigiJumpLeft.add_animation_frame(assets.image("Luigi_JumpLeft"))

    luigiJumpRight = animation.create_animation(ActionKind.JumpingRight, 100)
    animation.attach_animation(s, luigiJumpRight)
    luigiJumpRight.add_animation_frame(assets.image("Luigi_JumpRight"))


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
    # ground jump
    if hero.is_hitting_tile(CollisionDirection.BOTTOM):
        hero.vy = current_jump_multiplier * pixelsToMeters
    elif canDoubleJump:
        doubleJumpSpeed = -5 * pixelsToMeters
        # Good double jump
        if hero.vy >= -60:
            doubleJumpSpeed = -4 * pixelsToMeters
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
        tiles.set_tilemap(tilemap("""
            level_3
            """))
    elif level == 4:
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


def createPlayer(player2: Sprite, speed: number = 100, initialize_stats: bool = True):
    global canDoubleJump, heroCurrentAction
    player2.ay = gravity
    scene.camera_follow_sprite(player2)
    controller.move_sprite(player2, speed, 0)
    player2.z = 5
    # Only initialize life/score when creating initial player
    if initialize_stats:
        info.set_life(3)
        info.set_score(0)
    # Reset double-jump availability when creating player
    canDoubleJump = True
    # Reset current animation action state for the new sprite
    if heroFacingLeft:
        heroCurrentAction = ActionKind.IdleLeft
    else:
        heroCurrentAction = ActionKind.IdleRight
    animation.set_action(player2, heroCurrentAction)


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


#### Switching characters (Mario <-> Luigi) ####
def switch_character():
    global hero, heroIsLuigi, current_speed, current_jump_multiplier, current_traction, heroCurrentAction
    # Save state
    saved_x = hero.x
    saved_y = hero.y
    saved_vx = hero.vx
    saved_vy = hero.vy
    saved_life = info.life()
    saved_score = info.score()
    saved_facing_left = heroFacingLeft

    # Destroy old hero sprite
    hero.destroy()

    # Toggle
    heroIsLuigi = not heroIsLuigi

    # Create new sprite with appropriate idle image depending on facing
    if heroIsLuigi:
        # create Luigi
        if saved_facing_left:
            new_image = assets.image("Luigi_IdleLeft")
            heroCurrentAction = ActionKind.IdleLeft
        else:
            new_image = assets.image("Luigi_IdleRight")
            heroCurrentAction = ActionKind.IdleRight
        hero = sprites.create(new_image, SpriteKind.player)
        # Set character-specific parameters
        current_speed = luigi_speed
        current_jump_multiplier = luigi_jump_multiplier
        current_traction = luigi_traction
        # Attach animations for Luigi
        attach_luigi_animations_to(hero)
    else:
        # create Mario
        if saved_facing_left:
            new_image = assets.image("Mario_IdleLeft")
            heroCurrentAction = ActionKind.IdleLeft
        else:
            new_image = assets.image("Mario_IdleRight")
            heroCurrentAction = ActionKind.IdleRight
        hero = sprites.create(new_image, SpriteKind.player)
        current_speed = mario_speed
        current_jump_multiplier = mario_jump_multiplier
        current_traction = mario_traction
        attach_mario_animations_to(hero)

    # Restore position and motion
    hero.x = saved_x
    hero.y = saved_y
    hero.vx = saved_vx
    hero.vy = saved_vy

    # Recreate player physics & controller binding without resetting life/score
    createPlayer(hero, current_speed, initialize_stats=False)

    # Restore life & score
    info.set_life(saved_life)
    info.set_score(saved_score)

    # Ensure the hero has the correct current animation action set
    animation.set_action(hero, heroCurrentAction)


def on_b_pressed():
    switch_character()

controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)


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


# Reset double jump when standing on ground
def on_update3():
    global canDoubleJump
    if hero.is_hitting_tile(CollisionDirection.BOTTOM):
        canDoubleJump = True

game.on_update(on_update3)


# set up hero animations and apply traction
def on_update4():
    global heroFacingLeft, heroCurrentAction
    # Update facing based on vx
    if hero.vx < 0:
        heroFacingLeft = True
    elif hero.vx > 0:
        heroFacingLeft = False

    # Prevent sticking into the top of tiles
    if hero.is_hitting_tile(CollisionDirection.TOP):
        hero.vy = 0

    # Decide desired action. Use grounded check (is_hitting_tile(BOTTOM)) to determine airborne.
    grounded = hero.is_hitting_tile(CollisionDirection.BOTTOM)

    if not grounded:
        # If airborne, always use jumping animation (prevents flicker between run and jump)
        if heroFacingLeft:
            desired_action = ActionKind.JumpingLeft
        else:
            desired_action = ActionKind.JumpingRight
    else:
        # Grounded: choose running or idle based on vx
        if hero.vx < 0:
            desired_action = ActionKind.RunningLeft
        elif hero.vx > 0:
            desired_action = ActionKind.RunningRight
        else:
            if heroFacingLeft:
                desired_action = ActionKind.IdleLeft
            else:
                desired_action = ActionKind.IdleRight

    # Only call set_action when the action changes to avoid restarting animations and causing visual glitches
    if desired_action != heroCurrentAction:
        animation.set_action(hero, desired_action)
        heroCurrentAction = desired_action

    # Traction: when on ground and player isn't pressing left/right, apply friction
    if grounded:
        left_pressed = controller.left.is_pressed()
        right_pressed = controller.right.is_pressed()
        if not left_pressed and not right_pressed:
            # apply traction (slows the hero)
            hero.vx = int(hero.vx * current_traction)
            # snap to zero when very small
            if abs(hero.vx) < 5:
                hero.vx = 0

game.on_update(on_update4)


#### Setup initial game state ####
initializeAnimations()
# createPlayer called to set initial controls & stats (Mario)
createPlayer(hero, current_speed, initialize_stats=True)
levelCount = 4
currentLevel = 0
setLevelTileMap(currentLevel)