
//string [] myWords = new string["Scrum","Agile","Stories"];
const MESSAGE = "  Agile  Sprint  Kaizen  Release  Team  ProductBacklog  Agile  Lean  CleanCode  INVEST  PairProgramming   Review  Transparency  ProductOwner  Scrum   TDD  SprintGoal  Kanban  TimeBoxing  Agile  Games   Persona  Value  Adaptation  PlanningPoker  StoryPoints  UXDesign  Planning  Maps   DoR   Scrum  Inspection  Retrospective  DoD  Agile  BurnDownChart  Lean  Velocity  Scrum  DailyMeeting  Scrum ";
let centerX, centerY, radius, prevRadius, angle, dir, letterCount, letterSize;
let bckgColor;

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	bckgColor = random(8, 98);
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