#include <Servo.h>


/////////////////////////////////////////////////////////////////

// Horizontal Servo Settings
#define servoHorizontalMin 0 // Angle of rotation, left
#define servoHorizontalMax 130 // Angle of rotation, right
#define servoHorizontalSpeed 10 // Speed, the higher the value, the lower the speed
#define servoHorizontalAiSpeed 10 // Direction change frequency, the higher the value, the lower the speed

//---------------------

// Vertical Servo Settings
#define servoVerticalMin 0 // Angle of rotation, down
#define servoVerticalMax 90 // Angle of rotation, up
#define servoVerticalSpeed 15 // Speed, the higher the value, the lower the speed
#define servoVerticalAiSpeed 15 // Direction change frequency, the higher the value, the lower the speed

//---------------------

// Lazer Settings
#define lazerPower 128 // The PWM value at which the laser starts to glow
#define lazerFadingValue 125 // The PWM value at which the laser turns off
#define lazerFading 3 // Laser blanking, the higher the value, the dimmer the laser (cat eye protection)
#define lazerDuration 30 // The frequency of switching off the laser, the higher the value, the less often the laser is switched off
#define lazerDurationSpeed 2 // Laser Algorithm Frequency, the higher the value, the lower the speed


/////////////////////////////////////////////////////////////////


unsigned long timeTime, timer_1, timer_2, timer_3, delay_1, delay_2;
Servo servo_1;
int servo_1_newPos, servo_1_pos, servo_1_speedCh;
Servo servo_2;
int servo_2_newPos, servo_2_pos, servo_2_speedCh;
int lazer = A0;
int delay_3;
bool lazerOn;


/////////////////////////////////////////////////////////////////


void setup() {
  //---------------------

  servo_1.attach(3);
  servo_1.write(90);
  servo_1_speedCh = 15;

  //---------------------

  servo_2.attach(4);
  servo_2.write(90);
  servo_2_speedCh = 15;

  //---------------------
}


/////////////////////////////////////////////////////////////////


void loop() {
  //---------------------

  timeTime = millis();

  //---------------------

  Servo_Horizontal();
  Servo_Vertical();
  Lazer();
  //---------------------
}


/////////////////////////////////////////////////////////////////


void Servo_Horizontal() {
  //---------------------

  if (timeTime >= timer_1)
  {
    timer_1 = timeTime + (random(10, 30) * random(servoHorizontalAiSpeed - 5, servoHorizontalAiSpeed + 20));
    servo_1_newPos = random(servoHorizontalMin, servoHorizontalMax);
    servo_1_speedCh = random(1, 3) * random(servoHorizontalSpeed - 5, servoHorizontalSpeed + 20);
    servo_1_pos = servo_1.read();
  }

  //---------------------

  if (timeTime > delay_1)
  {
    delay_1 = timeTime + servo_1_speedCh;
    if (servo_1_pos > servo_1_newPos) servo_1.write(--servo_1_pos);
    else servo_1.write(++servo_1_pos);
  }

  //---------------------
}


/////////////////////////////////////////////////////////////////


void Servo_Vertical() {
  //---------------------

  if (timeTime >= timer_2)
  {
    timer_2 = timeTime + (random(10, 30) * random(servoVerticalAiSpeed - 5, servoVerticalAiSpeed + 20));
    servo_2_newPos = random(servoVerticalMin, servoVerticalMax);
    servo_2_speedCh = random(1, 3) * random(servoVerticalSpeed - 5, servoVerticalSpeed + 20);
    servo_2_pos = servo_2.read();
  }

  //---------------------

  if (timeTime > delay_2)
  {
    delay_2 = timeTime + servo_2_speedCh;
    if (servo_2_pos > servo_2_newPos) servo_2.write(--servo_2_pos);
    else servo_2.write(++servo_2_pos);
  }

  //---------------------
}


/////////////////////////////////////////////////////////////////


void Lazer() {
  //---------------------

  if (lazerDuration > 3)
  {
    if (timeTime >= timer_3)
    {
      timer_3 = timeTime + (random(500, 1000) * lazerDurationSpeed);
      lazerOn = random(1, lazerDuration) > 3;
    }

    if (lazerOn == true)
    {
      if (delay_3 < lazerFading)
      {
        ++delay_3;
        analogWrite(lazer, lazerFadingValue);
      }
      else
      {
        delay_3 = 0;
        analogWrite(lazer, lazerPower);
      }
    }
    else analogWrite(lazer, 0);
  }
  else analogWrite(lazer, 0);

  //---------------------
}


/////////////////////////////////////////////////////////////////
