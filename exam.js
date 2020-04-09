$ = (id) => document.getElementById(id);

var q_num = 1;

function addQuestion(question) {
	switch (question.type) {
		case "Y/N":
			addYN(question);
			break;
		case "Likert":
			addLikert(question);
			break;
		case "Mulitple":
			addMultiple(question)
			break;
		default:
			break;
	}
	q_num++;
}

function addYN(question) {
	var container = document.createElement("div");
	var title = document.createElement("p");
	title.appendChild(document.createTextNode(q_num + ". " + question.prompt));
	container.appendChild(title);
	container.title = question.category;

	var radio_group = document.createElement("div");

	var yes = document.createElement("input");
	yes.type = "radio";
	yes.name = question.id;
	yes.id = question.id+"yes";
	yes.value = "yes";

	radio_group.appendChild(yes);
	radio_group.appendChild(document.createTextNode("Yes"))

	var no = document.createElement("input");
	no.type = "radio";
	no.name = question.id;
	no.id = question.id+"no";
	no.value = "no";

	radio_group.appendChild(no);
	radio_group.appendChild(document.createTextNode("No"))

	document.body.appendChild(container);
	document.body.appendChild(radio_group);
}

function addLikert(question) {
	var container = document.createElement("div");
	var title = document.createElement("p");
	title.appendChild(document.createTextNode(q_num + ". " + question.prompt));
	container.appendChild(title);
	container.title = question.category;

	var radio_group = document.createElement("div");
	radio_group.appendChild(document.createTextNode(question.labels[0]));
	for (i = 0; i < question.amt; i++) {
		var button = document.createElement("input");
		button.type = "radio";
		button.name = question.id;
		button.id = question.id + i;
		radio_group.appendChild(button);
	}
	radio_group.appendChild(document.createTextNode(question.labels[1]));
	container.appendChild(radio_group);

	document.body.appendChild(container);
}

var totalMarks = {total: 0, categories: {}};
var countedMarks = {total: 0, categories: {}};

function addMarks(questions) {
	totalMarks = {total: 0, categories: {}};
	for (q in questions) {
		let question = questions[q];
		totalMarks.total += question.weight;
		if (totalMarks.categories[question.category] == undefined) {
			totalMarks.categories[question.category] = 0;
		}

		totalMarks.categories[question.category] += question.weight;
	}
}

function countMarks(questions) {
	countedMarks = {total: 0, categories: {}};
	for (q in questions) {
		let question = questions[q];

		switch (question.type) {
			case "Y/N":
				countYN(question);
				break;
			case "Likert":
				countLikert(question);
				break;
			default:
				break;
		}
	}
}

function countYN(question) {
	let correct_button = document.getElementById(question.id + question.correct);

	let marks = (correct_button.checked) ? question.weight : 0;
	countedMarks.total += marks;
	if (countedMarks.categories[question.category] == undefined) {
		countedMarks.categories[question.category] = 0;
	}

	countedMarks.categories[question.category] += marks;
}

function countLikert(question) {
	let buttons = document.getElementsByName(question.id);

	let marks = 0;
	for (let i = 0; i < question.amt; i++) {
		if (buttons[i].checked) {
			marks = question.weight * i/(question.amt-1);
			break;
		}
	}
	countedMarks.total += marks;
	if (countedMarks.categories[question.category] == undefined) {
		countedMarks.categories[question.category] = 0;
	}

	countedMarks.categories[question.category] += marks;
}

questions = [
	{
		type: "Likert",
		prompt: "I find it important to communicate security concerns with other members of my team.",
		id: "q1",
		amt: 5,
		weight: 10,
		labels: ["Strongly Disagree", "Strongly Agree"],
		category: "General",
	},
	{
		type: "Likert",
		prompt: "I keep up to date on known security vulnerabilities and how to counteract them.",
		id: "q2",
		amt: 5,
		weight: 15,
		labels: ["Never", "Always"],
		category: "General",
	},
	{
		type: "Likert",
		prompt: "Security is an important consideration when planning and designing software.",
		id: "q3",
		amt: 5,
		weight: 15,
		labels: ["Strongly Disagree", "Strongly Agree"],
		category: "Design",
	},
	{
		type: "Likert",
		prompt: "I use threat modelling to identify potential threats for the software I develop.",
		id: "q4",
		amt: 5,
		weight: 13,
		labels: ["Never", "Always"],
		category: "Design",
	},
	{
		type: "Likert",
		prompt: "I try to keep the design of my software as simple as possible.",
		id: "q5",
		amt: 5,
		weight: 10,
		labels: ["Never", "Always"],
		category: "Design",
	},
	{
		type: "Likert",
		prompt: "Software designers play an important role in security.",
		id: "q6",
		amt: 5,
		weight: 10,
		labels: ["Strongly Disagree", "Strongly Agree"],
		category: "Design",
	},
	{
		type: "Likert",
		prompt: "Security is an important consideration during software implementation.",
		id: "q7",
		amt: 5,
		weight: 15,
		labels: ["Strongly Disagree", "Strongly Agree"],
		category: "Implementation",
	},
	{
		type: "Likert",
		prompt: "I verify that development resources I refer to provide secure solutions.",
		id: "q8",
		amt: 5,
		weight: 13,
		labels: ["Never", "Always"],
		category: "Implementation",
	},
	{
		type: "Likert",
		prompt: "I rely first on official documentation for security-vulnerable tasks.",
		id: "q9",
		amt: 5,
		weight: 10,
		labels: ["Never", "Always"],
		category: "Implementation",
	},
	{
		type: "Likert",
		prompt: "Security is an important consideration during developer testing.",
		id: "q10",
		amt: 5,
		weight: 15,
		labels: ["Strongly Disagree", "Strongly Agree"],
		category: "Implementation",
	},
	{
		type: "Likert",
		prompt: "Developer tests are used to thoroughly test likely security vulnerabilities.",
		id: "q11",
		amt: 5,
		weight: 10,
		labels: ["Never", "Always"],
		category: "Implementation",
	},
	{
		type: "Likert",
		prompt: "Security tests are differentiated from other tests in developer testing.",
		id: "q12",
		amt: 5,
		weight: 5,
		labels: ["Never", "Always"],
		category: "Implementation",
	},
	{
		type: "Likert",
		prompt: "Security tests are differentiated from other tests in developer testing.",
		id: "q13",
		amt: 5,
		weight: 15,
		labels: ["Strongly Disagree", "Strongly Agree"],
		category: "Maintenance and Testing",
	},
	{
		type: "Likert",
		prompt: "Code reviews are conducted with a focus on security.",
		id: "q14",
		amt: 5,
		weight: 10,
		labels: ["Never", "Always"],
		category: "Maintenance and Testing",
	},
	{
		type: "Likert",
		prompt: "Automated tools are used to perform code analysis.",
		id: "q15",
		amt: 5,
		weight: 10,
		labels: ["Never", "Always"],
		category: "Maintenance and Testing",
	},
	{
		type: "Likert",
		prompt: "Post-development testing tests for security vulnerabilities.",
		amt: 5,
		weight: 15,
		labels: ["Never", "Always"],
		category: "Maintenance and Testing",
	}
];

function getNutritionLevel(total) {
	if (total <= 50){
		return "EXTREMELY POOR"
	} else if (total <= 70) {
		return "VERY POOR";
	} else if (total <= 95) {
		return "POOR";
	} else if (total <= 130) {
		return "BELOW AVERAGE";
	} else if (total <= 160) {
		return "AVERAGE";
	} else {
		return "HEALTHY";
	}
}

function showReport() {
	countMarks(questions);

	let domom = document.getElementById("results");
	
	if (domom != undefined) {
		domom.remove();
	}

	let report_container = document.createElement("div");
	report_container.classList.add("report");

	let report_title = document.createElement("h3");
	report_title.appendChild(document.createTextNode("Security Nutrition Score"))

	report_container.appendChild(report_title);

	let table = document.createElement("table")
	report_container.id = "results";

	for (j in totalMarks.categories) {
		let row = document.createElement("tr")
		let r_header = document.createElement("td");
		r_header.appendChild(document.createTextNode(j))
		row.appendChild(r_header);

		let r_data = document.createElement("tr");
		r_data.appendChild(document.createTextNode(`${countedMarks.categories[j]}/${totalMarks.categories[j]}`))
		row.appendChild(r_data);
		table.appendChild(row);
	}

	{
		let row = document.createElement("tr")
		let r_header = document.createElement("td");
		r_header.appendChild(document.createTextNode("Total Score"))
		row.appendChild(r_header);

		let r_data = document.createElement("tr");
		r_data.appendChild(document.createTextNode(`${countedMarks.total}/${totalMarks.total}`))
		row.appendChild(r_data);
		table.appendChild(row);
	}

	let score = document.createElement("h4");
	score.appendChild(document.createTextNode("Your Nutrition Rating is "+ getNutritionLevel(countedMarks.total)));
	
	report_container.appendChild(score);

	report_container.appendChild(table);
	document.body.appendChild(report_container);
}

function addQuestions(questions) {

	for (q in questions) {addQuestion(question = questions[q]);}

	let button = document.createElement("button");
	button.onclick = (e) => {showReport()};
	button.textContent = "Submit";

	document.body.appendChild(button);
}

addQuestions(questions);
addMarks(questions);