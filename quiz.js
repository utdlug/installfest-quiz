// I'm sorry this is really gross
currentQuestion = 0

var categories = [
    "difficulty",
    "barrier_to_community",
    "gaming_difficulty",
    "newness",
    "hackiness",
]

var points = {
    difficulty: 0,
    barrier_to_community: 0,
    gaming_difficulty: 0,
    newness: 0,
    hackiness: 0,
}

distros = [
    "void",
    "ubuntu",
    "debian",
    "arch",
    "slackware",
    "centos",
    "opensuse",
    "fedora",
    "mint",
]

distro_details = {
    void: {
        name: "Void Linux",
        description: "Void Linux is an independent distribution, developed entirely by volunteers.<br/>  It uses understandable tools like runit and xbps, provides rolling-release updates, and welcomes involvement.",
        difficulty: 8,
        barrier_to_community: 3,
        gaming_difficulty: 6,
        newness: 9,
        hackiness: 8,
        difference: 0,
    },
    ubuntu: {
        name: "Ubuntu",
        description: "Ubuntu is one of the most popular Linux distributions, providing a set of sane defaults, a user-friendly interface, and a large support community",
        difficulty: 1,
        barrier_to_community: 7,
        gaming_difficulty: 1,
        newness: 5,
        hackiness: 2,
        difference: 0,
    },
    debian: {
        name: "Debian",
        description: "Debian is an older, more stable Linux distribution.  It provides a lot of flexibility, while maintaining ease of use.",
        difficulty: 3,
        barrier_to_community: 4,
        gaming_difficulty: 3,
        newness: 0,
        hackiness: 2,
        difference: 0,
    },
    arch: {
        name: "Arch Linux",
        description: "Arch Linux is a do-it-yourself distro with an emphasis on simplicity.",
        difficulty: 9,
        barrier_to_community: 2,
        gaming_difficulty: 4,
        newness: 9,
        hackiness: 9,
        difference: 0,
    },
    slackware: {
        name: "Slackware",
        description: "One of the original SUSE distributions, Slackware aims for design stability, simplicity, and power.",
        difficulty: 21,
        barrier_to_community: 10,
        gaming_difficulty: 10,
        newness: 10,
        hackiness: 10,
        difference: 0,
    },
    centos: {
        name: "CentOS",
        description: "CentOS is the community version of the enterprise Red Hat distribution, commonly found in the industry.",
        difficulty: 5,
        barrier_to_community: 5,
        gaming_difficulty: 7,
        newness: 4,
        hackiness: 0,
        difference: 0,
    },
    opensuse: {
        name: "OpenSUSE",
        description: "OpenSUSE is the community version of the enterprise SUSE linux, known for its music videos and feature-rich packages.",
        difficulty: 5,
        barrier_to_community: 4,
        gaming_difficulty: 4,
        newness: 6,
        hackiness: 2,
        difference: 0,
    },
    fedora: {
        name: "Fedora",
        description: "Fedora is the upstream version of the enterprise Red Hat distribution, and is used by Linus Torvalds himself.",
        difficulty: 3,
        barrier_to_community: 6,
        gaming_difficulty: 4,
        newness: 7,
        hackiness: 1,
        difference: 0,
    },
    mint: {
        name: "Linux Mint",
        description: "Linux Mint is a fork of Ubuntu with a focus on User Experience",
        difficulty: 1,
        barrier_to_community: 6,
        gaming_difficulty: 3,
        newness: 3,
        hackiness: 3,
        difference: 0,
    }
}

var questions = [
    {
        question:'How do you enter a pool?',
        description:'Do you want to ease into Linux, or jump directly into the deep end?',
        next:1,
        choices:[
            {text:'I take the stairs', category:'difficulty', points:1},
            {text:'I prefer to dive in', category:'difficulty', points:2},
            {text:'CANNOONNNBAAAALLLL', category:'difficulty', points:3},
            {text:'I never left the pool!', category:'difficulty', points:5},
        ]
    },
    {
        question:'Party Line vs Grassroots?',
        description:'Do you want to be able to make a difference in your distro\'s community?',
        next:2,
        choices:[
            {text:'I want the difficult decisions to be made for me', category:'barrier_to_community', points:1},
            {text:'I want to be heard', category:'barrier_to_community', points:10},
        ]
    },
    {
        question:'Do you play games?',
        description:'Do you need support for all the games?',
        next:3,
        choices:[
            {text:'I play with Steam', category:'gaming_difficulty', points:1},
            {text:'I like the Humble Bundle', category:'gaming_difficulty', points:7},
            {text:'I don\'t have fun', category:'gaming_difficulty', points:10},
        ]
    },
    {
        question:'Nerf Guns vs LEGO?',
        description:'Does your fun come pre-assembled, or do you build it yourself?',
        next:4,
        choices:[
            {text:'Nerf Guns', category:'difficulty', points:0},
            {text:'It depends', category:'difficulty', points:2},
            {text:'I build things with LEGO', category:'difficulty', points:5},
        ]
    },
    {
        question:'Tron vs Tron Legacy',
        description:'New and shiny software, or old and proven?',
        next:5,
        choices:[
            {text:'Tron', category:'newness', points:1},
            {text:'Tron Legacy', category:'newness', points:10},
        ]
    },
    {
        question:'Flatbed Pickup vs Kit Car?',
        description:'Do you want something used in industry, or better for your fun project?',
        next:0,
        choices:[
            {text:'Industry uses 18-wheelers', category:'hackiness', points:1},
            {text:'A practical pickup truck', category:'hackiness', points:3},
            {text:'A kit car sounds fun!', category:'hackiness', points:7},
            {text:'I\'d like a motorcycle', category:'hackiness', points:10},
        ]
    },
]

$(document).ready(function() {
    replaceQuestion(0)
})

function replaceQuestion(num) {
    $('#question_title').text(questions[num].question)
    $('#question_description').text(questions[num].description)
    answers = ''
    choices = questions[num].choices
    for (var i = 0, len = choices.length; i < len; i++) {
        answers += '<div href="#" class="choice" onclick="answer(' + i + ')"id="' + i + '">' + choices[i].text + '</div>'
    }
    $('#answers').empty()
    $('#answers').append(answers)
    currentQuestion = num
}

function answer(num) {
    choice = questions[currentQuestion].choices[num]
    next = 1
    if (typeof(choice.next) != 'undefined'){
        next = choice.next
    } else {
        next = questions[currentQuestion].next
    }

    points[choice.category] = choice.points

    if (next == 0) {
        finish()
    } else {
        replaceQuestion(next)
    }
}


function finish() {
    for (let category of categories){
        for (let distro of distros){
            diff = Math.abs(distro_details[distro][category] - points[category])
            distro_details[distro]['difference'] += diff
        }
    }

    /* Find closest */
    min = 100
    chosen_distro = 'noobuntu'
    for (let distro of distros){
        if (distro_details[distro]['difference'] < min){
            chosen_distro = distro
            min = distro_details[distro]['difference']
        }
    }

    $('#container').empty()
    $('#container').append('<h3>You are...</h3><h1>' + distro_details[chosen_distro]["name"] + '</h1><br/><br/><div id="question_description">' + distro_details[chosen_distro]['description'] + '</div>')
    // Todo: List three other candidates
}
