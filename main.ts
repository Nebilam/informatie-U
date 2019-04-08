let strip: neopixel.Strip = null
let crasch1 = 0
let tabel = 0
let lichtniveau = 0
let ultra = 0
input.onButtonPressed(Button.AB, function () {
    ultra = 1
})
input.onButtonPressed(Button.B, function () {
    ultra = 0
    maqueen.motorStopAll()
    basic.clearScreen()
    basic.showString("lichtniveau")
    basic.pause(1000)
    lichtniveau = 1
    basic.pause(5000)
    lichtniveau = 0
    basic.showIcon(IconNames.Happy)
})
input.onButtonPressed(Button.A, function () {
    ultra = 0
    maqueen.motorStopAll()
    basic.clearScreen()
    basic.showString("Temperatuur")
    basic.pause(1000)
    basic.showString("" + input.temperature())
    basic.pause(1000)
    basic.showIcon(IconNames.Happy)
})
lichtniveau = 0
ultra = 0
crasch1 = 0
strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB_RGB)
music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
strip.showColor(neopixel.colors(NeoPixelColors.Blue))
basic.pause(2000)
maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
basic.showString("Hello world! I am Laxoi micro:bit")
basic.showString("Hoi!")
basic.showIcon(IconNames.Happy)
basic.pause(1000)
basic.showIcon(IconNames.Heart)
music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
basic.pause(4500)
basic.clearScreen()
basic.showString("Klik op A voor temperatuur. Klik op B voor lichtniveau.Voor rijden klik op A+B. ")
basic.showIcon(IconNames.Happy)
music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once)
basic.pause(4000)
basic.forever(function () {
    if (lichtniveau == 1) {
        tabel = input.lightLevel()
        led.plotBarGraph(
            tabel,
            0
        )
    }
    if (ultra == 1) {
        if (crasch1 == 3) {
            strip.showColor(neopixel.colors(NeoPixelColors.Blue))
            basic.pause(1000)
            music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
            maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CCW, 200)
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
            maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CCW, 200)
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
            basic.pause(2000)
        }
        if (maqueen.sensor(PingUnit.Centimeters) < 10) {
            strip.showColor(neopixel.colors(NeoPixelColors.Green))
            if (Math.randomBoolean() == true) {
                maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CW, 150)
                maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
                maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CW, 0)
                maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
                crasch1 += 1
            } else {
                maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CW, 150)
                maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
                maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CW, 0)
                maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
                crasch1 += 1
            }
            basic.pause(715)
        } else {
            maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CW, 100)
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
            maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CW, 100)
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            crasch1 = 0
        }
    }
})
