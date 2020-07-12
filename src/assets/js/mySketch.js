/******************
Code by Vamoss
Original code link:
https://www.openprocessing.org/sketch/880860

Author links:
http://vamoss.com.br
http://twitter.com/vamoss
http://github.com/vamoss
******************/
//string [] myWords = new string["Scrum","Agile","Stories"];
const MESSAGE = "  Agile  Team  HighStandards  ProductBacklog  RoadMap  Planning  Persona  Transparency  Scrum  ProductOwner  UserStory  INVEST  Value  Team  StoryPoints  PlanningPoker  Kaizen  Adaptation  Epic  Sprint  Lean  Kanban  TimeBoxing  Scrum  DailyMeeting  Facilitation  MamaBear  SprintGoal  CleanCode  ContinousIntegration  DoR  TDD  GoodPractices  PairPrograming  BurnDownChart  Games  UXDesign  UnitTests  DoD  Review  Release  Deployment  Quality  Retrospective  ";
let centerX, centerY, radius, prevRadius, angle, dir, letterCount, letterSize;
let bckgColor;

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	bckgColor = random(8, 80);
	background(bckgColor);
	textAlign(CENTER, CENTER);
	
	
	letterSize = 1;
	letterCount = 0;
	centerX = 10;
	centerY = height/2;
	radius = 10;
	prevRadius = 10;
	angle = 0;
	dir = 1;
}

function draw() {
	let letter = MESSAGE[letterCount];
	letterCount = ++letterCount%MESSAGE.length;
	fill(255);
	
	if(frameCount % 4 == 0)
		letterSize = ceil(frameCount / 40)
	
	textSize(letterSize);
	var letterWidth = textWidth(letter);
	
	var angleIncrease = letterWidth / radius * dir;
	var radiusIncrease = letterSize / 40;
	
	angle += angleIncrease / 2;
	radius += radiusIncrease / 2;
	
	var x = cos(angle) * radius + centerX;
	var y = sin(angle) * radius + centerY;
	
	push();
		translate(x, y);
		rotate(angle + HALF_PI * dir);
		text(letter, 0, 0);
	pop();
	
	angle += angleIncrease / 2;
	radius += radiusIncrease / 2;
	
	if(radius > prevRadius / 1.5 && mod(angle, TWO_PI) < 10 / radius ){
		prevRadius = radius * 2;
		centerX += radius * 1.5;
		radius /= 2;
		angle += PI;
		dir *= -1;
	}
}

//fixes negative values
function mod(m, n) {
    return ((m%n)+n)%n;
}