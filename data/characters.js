// data/characters.js
// EXACT names / pronouns / ages / occupations from your cards.
// Add bullet points later where indicated.

export const characters = [
    {
      id: 1,
      name: "Derek Li",
      pronouns: "He/him",
      age: 20,
      occupation: "Part-time IT intern at a local tech startup.",
      image: require("../assets/characters/derekli.png"),
      techSkills: [
        "Often experiments with new software and online tools.",
        "Interested in cybersecurity and computer networks.",
        "Proficient with photo and video editing.",
        "Experienced with social media platforms and online privacy settings."
      ],
      knownHabits: [
        "Regularly reads about online privacy and digital footprints.",
        "Frequently stays up late working on personal coding projects.",
        "Has several online accounts, one which is a professional business account to showcase coding projects.",
        "Prefers texting or anonymous chat apps over video calls."
      ],
      digitalFootprint: [
        "Has 3 dating apps downloaded on his phone, all with profiles linked to his IP address.",
        "Active in anonymous online forums where users share tips about privacy and exploring account security.",
        "Left an angry reply on an online forum which states “Dating in the present day is sooo much work. I feel like I could spend time doing something else instead of looking for “the one.” Do I really want to go through all of that?”",
        "One of his dating profiles has been blocked by many users according to multiple reports and witnesses.",
        "Posts about his coding projects frequently."
      ],
      searchHistory: [
        "“Best ways to bypass id authentication on social media”",
        "“Guide to creating a good dating profile”",
        "“Does incognito mode really make you untrackable?”",
        "“What information should I keep private on my social media?”"
      ]
    },
    {
      id: 2,
      name: "Ellie Jameson",
      pronouns: "She/her",
      age: 21,
      occupation: "College Student / Part-time Social Media Assistant.",
      image: require("../assets/characters/elliejameson.png"),
      techSkills: [
        "Experienced with photo editing.",
        "Knows the best fake number and email generators.",
        "Familiar with social media algorithms and content targeting.",
        "Comfortable using anonymous accounts and VPN browser extensions."
      ],
      knownHabits: [
        "Does not use her phone during school hours (8AM–4PM).",
        "Deletes comments that call her out for spreading misinformation.",
        "Known for getting into arguments online using alternate accounts.",
        "Uses a VPN browser extension."
      ],
      digitalFootprint: [
        "Runs three different social media accounts with separate identities.",
        "Her email is used as a recovery/backup email for three other emails, one is signed up on an online gossip forum.",
        "Left an angry reply on an online forum which states “Dating in the present day is sooo much work. I feel like I could spend time doing something else instead of looking for “the one.” Do I really want to go through all of that?”",
        "Has been banned three times due to “misleading identity” and “hateful speech.”",
        "Commented a clown emoji under another user’s post from a burner account."
      ],
      searchHistory: [
        "“How to get unbanned from Instagram”",
        "“Best fake DM generator”",
        "“Can people see if I have multiple accounts?”",
        "“How to appeal reports online”"
      ]
    },
    {
      id: 3,
      name: "Mitchel Montoya",
      pronouns: "He/him",
      age: 23,
      occupation: "College Student.",
      image: require("../assets/characters/mitchelmontoya.png"),
      techSkills: [
        "Does not know how to use tech-savvy editing apps, but can do basic editing.",
        "Took a crash course on how to edit in college for his class.",
        "Uses social media daily but doesn’t create advanced content."
      ],
      knownHabits: [
        "Often uses an incognito browsing tab.",
        "Drops off his golden retriever at his dog sitter’s house every day at 3 pm.",
        "Always on his phone on social media apps",
        "Uses a VPN."
      ],
      digitalFootprint: [
        "Has created multiple accounts.",
        "His email is linked to 4 other accounts. 3 of the 4 accounts have over 15k followers without any posts.",
        "Follows random non-profit organizations that promote awareness.",
        "Follows and tags random large brands for visibility."
      ],
      searchHistory: [
        "“How many followers is considered reliable”",
        "“Recent public news”",
        "“How to make message sound urgent”",
        "“Guilttrip techniques”"
      ]
    },
    {
      id: 4,
      name: "Kassidy Howard",
      pronouns: "She/her",
      age: 22,
      occupation: "Marketing student, Part-time digital artist.",
      image: require("../assets/characters/kassidyhoward.png"),
      techSkills: [
        "Passionate with digital art, draws a lot in her free time.",
        "Experience with digital marketing + web design.",
        "Has basic photo and video editing skills."
      ],
      knownHabits: [
        "Uses her phone often during class, on campus, and throughout lessons.",
        "Logged into school computers outside of regular hours.",
        "Has multiple burner email accounts.",
        "Rarely updates device software."
      ],
      digitalFootprint: [
        "Signed online petitions with different name variations.",
        "Some names included “Alyssa”, “Taryn”, “Peyton”, etc. in addition to her own name.",
        "Has her own website to promote her small business, where she does art commissions. The website is very well-made and looks professional with eye-catching graphics.",
        "Commented on a public forum related to identity theft 9 months ago, saying, “Is this actually illegal though?”",
        "Follows many friends from her college.",
        "Reposted a video about a fashion brand’s new clothing drop."
      ],
      searchHistory: [
        "“Random female name generator”",
        "“How to create a realistic website in 15 minutes”",
        "“How to set up anonymous account to transfer money”",
        "“What indicates a fake/unreliable website?”",
        "“Tips for promoting petitions on social media”"
      ]
    },
    {
      id: 5,
      name: "Alyce Conley",
      pronouns: "she/her",
      age: 21,
      occupation: "College Student.",
      image: require("../assets/characters/alyceconley.png"),
      techSkills: [
        "Paid for advanced features on image editing apps.",
        "Extremely experience with photo and video editing.",
        "Can bypass paywalls or use archiving tools to copy articles for manipulation."
      ],
      knownHabits: [
        "Has experience using AI writing tools and voice filters to mimic formal writing style.",
        "Double majoring in Software Engineering and Journalism.",
        "A majority of her classes are online, running until 5PM.",
        "Main topics of interest for writing are public health and celebrity gossip."
      ],
      digitalFootprint: [
        "Her email is tracked with 3 different accounts pretending to be authors news accounts.",
        "Sparked controversy under articles surrounding the evidence about a celebrity’s cheating scandal.",
        "Got banned on a writing app for false information.",
        "Has written messages anonymously on online forums."
      ],
      searchHistory: [
        "“How can you check who wrote this article?”",
        "“Do you need to work for a news outlet to post for them?”",
        "“Free editing sounds”",
        "“How to edit on this app without paying?”"
      ]
    },
    {
      id: 6,
      name: "Arjun Singh",
      pronouns: "He/him",
      age: 19,
      occupation: "Medical student, studies Computer Science in free time.",
      image: require("../assets/characters/arjunsingh.png"),
      techSkills: [
        "Self-taught coding such as Python.",
        "Knows how to use proxy servers and VPNs.",
        "Has experimented with automating browser actions.",
        "Familiar with terminal commands and Linux software."
      ],
      knownHabits: [
        "Regularly clears browsing history.",
        "Keeps multiple email accounts for professional and personal use, but he is known to have 2 other accounts.",
        "Stays up late often, known to pull all-nighters once a week.",
        "Uses school library computers under guest accounts.",
        "Knows how to detect viruses in download links."
      ],
      digitalFootprint: [
        "Published anonymous posts on medical forums debating ethical dilemmas in the field of health care.",
        "Posted anonymously in a thread asking, “Do professors get notified of grade changes?” and “How often do grades update in the system?”",
        "Reposted a video of a dog at a veterinary hospital & pet medical center.",
        "Created a site blog 2 years ago called “Ethical Hacking: How does it work?”"
      ],
      searchHistory: [
        "“How to access hidden admin panels on school websites”",
        "“Do professors get alerts when grades change?”",
        "“How to disable school from monitoring your device 24/7”",
        "“Link shortener”"
      ]
    },
    {
      id: 7,
      name: "Britney Nolan",
      pronouns: "she/her",
      age: 17,
      occupation: "Highschooler, works at a local academy of music.",
      image: require("../assets/characters/britneynolan.png"),
      techSkills: [
        "Familiar with building websites using drag-and-drop builders.",
        "Knows basic coding, HTML, and CSS from self-study.",
        "Has experience scheduling posts and sending bulk messages for school clubs and gym promotions."
      ],
      knownHabits: [
        "Often works late-night shifts at the community gym, sometimes between midnight and early morning",
        "Likes to experiment with creating websites and online forms as a hobby",
        "Uses public gym Wi-Fi for work and personal projects.",
        "Shares “funny fake DM generators” in group chats and on social media as jokes."
      ],
      digitalFootprint: [
        "Owns a few social media accounts linked to temporary emails.",
        "Recently registered a personal website with a free domain for a side project.",
        "Follows “college prep” accounts that help build stronger applications.",
        "Has screenshots of fake DMs generated for humor",
        "Liked videos from her social media include a tutor solving a problem for a Music Theory test."
      ],
      searchHistory: [
        "“Best free website builders with forms”",
        "“Temporary email services for website registration”",
        "“How to schedule texts for group chats”",
        "“DM generator online”"
      ]
    },
    {
      id: 8,
      name: "Sania George",
      pronouns: "She/her",
      age: 36,
      occupation: "IT professional at a large tech company.",
      image: require("../assets/characters/saniageorge.png"),
      techSkills: [
        "Skilled in building and maintaining internal network systems",
        "Experienced in writing scripts for automation.",
        "Able to send mass messages through email/SMS automation platforms.",
        "Familiar with phishing tools and message generators."
      ],
      knownHabits: [
        "Rarely connects to a public WiFI/ often uses a hotspot to avoid tracking.",
        "Uses a burner phone and has two unique phone numbers.",
        "Keeps her laptop camera covered at all times.",
        "Uses encrypted messaging apps, so only the sender and recipient can read them."
      ],
      digitalFootprint: [
        "Has created different websites before that were claimed to be government and news sites.",
        "Her IP address was tied to mass messaging services as of 3 months ago.",
        "Active in a large amount of group chats on many different social media platforms. She sends many messages often through these group chats.",
        "Received a message from someone thanking her for her help. The account who sent that message recently posted about getting her drivers license."
      ],
      searchHistory: [
        "“Fake giveaway pop-up page”",
        "“How to publish a self-made website”",
        "“URL custom link shortener”",
        "“Automated mass-texting”"
      ]
    },
    {
      id: 9,
      name: "Javier Morales",
      pronouns: "he/him",
      age: 19,
      occupation: "College student, part-time job at a gift store.",
      image: require("../assets/characters/javiermorales.png"),
      techSkills: [
        "Familiar with building websites using drag-and-drop builders.",
        "Knows how to mask URLs with link shorteners.",
        "Familiar with email automation and mass-messaging tools."
      ],
      knownHabits: [
        "Sometimes helps friends set up birthday shoutout pages or digital invites.",
        "Likes experimenting with giveaway-style posts to boost engagement on his flyer page.",
        "Posts edits using animated GIFs and colorful graphics."
      ],
      digitalFootprint: [
        "Runs a small side account that promotes coffee from his friend’s cafe.",
        "Activity on a website shows that he used artificial intelligence to generate a voice message.",
        "A public comment shows him helping a friend link a Google Form for a party RSVP.",
        "Previously tagged in a story promoting a local sweepstakes with the caption: “Fingers crossed 🤞”."
      ],
      searchHistory: [
        "“How to make a form look aesthetic”",
        "“Creative thank-you page ideas for forms”",
        "“How to make message sound more official”",
        "“Royalty-free confetti GIFs”"
      ]
    },
    {
      id: 10,
      name: "Frederick Green",
      pronouns: "He/him",
      age: 38,
      occupation: "Real Estate Agent, former staff at cybersecurity company.",
      image: require("../assets/characters/frederickgreen.png"),
      techSkills: [
        "Self-taught in basic video editing software, but his edited videos don’t have a professional level quality.",
        "Studied programming and cryptography.",
        "Former “ethical hacker” at a cybersecurity company.",
        "Uses apps to edit geolocation and engagement statistics."
      ],
      knownHabits: [
        "Active on social media almost everyday.",
        "Often reposts trending influencers’ videos on his accounts with text over them, such as “Look what ____ posted” to get free views off of influencers.",
        "Uses many different names on each social media platform to avoid flagging."
      ],
      digitalFootprint: [
        "Posts AI generated videos on his accounts very often.",
        "Follows trending influencers that have the biggest social media platforms.",
        "Older posts around the time he left his cybersecurity job show sudden emotional relief with captions like: “Free to create again” and “Now I control the screen.”",
        "Multiple temporary websites and forms created during his time with the company.",
        "His file for his old computer pitch deck is called “XYXCompany_Pitch_Deck.pdf.”"
      ],
      searchHistory: [
        "“Easiest video editing apps to us”",
        "“Best AI generators”",
        "“Code to input image on a screen”",
        "“What influencers are trending right now?”"
      ]
    },
    {
      id: 11,
      name: "Stacey Bradley",
      pronouns: "she/her",
      age: 20,
      occupation: "Sophomore in college majoring in Communications.",
      image: require("../assets/characters/staceybradley.png"),
      techSkills: [
        "Skilled in social media branding and layout design for club pages.",
        "Uses school computers for quick edits and uploads between classes.",
        "Takes her classes online up until 4PM."
      ],
      knownHabits: [
        "Often makes “test” or burner accounts to try out profile aesthetics for clients or student groups.",
        "Familiar with VPNs (used one while studying abroad to access U.S. apps).",
        "Recently helped her friend regain access to a hacked account by creating a temporary backup page."
      ],
      digitalFootprint: [
        "Posted a photo of a campus club that discusses digital media and privacy issues.",
        "Frequently reads about identity theft awareness and spotting fake account.",
        "Follows mostly Communications majors, influencers, and media creators.",
        "Has a video reposted about a new software update for a popular dating app."
      ],
      searchHistory: [
        "“How to make a link tree without verification”",
        "“Best VPN when traveling abroad”",
        "“How to make your account look legit”",
        "“Fake account vs backup account, what’s the difference?”"
      ]
    },
    {
      id: 12,
      name: "Jocelyn Prince",
      pronouns: "She/her",
      age: 21,
      occupation: "College student studying Computer Science.",
      image: require("../assets/characters/jocelynprince.png"),
      techSkills: [
        "Knows how to set up public WiFi networks.",
        "Familiar with basic coding languages.",
        "Can create websites proficiently.",
        "Understands how to adjust pop-up permission.",
        "Experienced with data tracking and cybersecurity."
      ],
      knownHabits: [
        "Frequently visits crowded public places, enjoys studying and completing coding projects at cafes.",
        "Uses VPN and is on “private browsing” mode regularly.",
        "Keeps multiple USB drives hidden with no known purposes.",
        "Regularly changes online usernames.",
        "Shares “exclusive access links.”"
      ],
      digitalFootprint: [
        "Created “early access” pages mimicking app updates as an assignment for her app design class.",
        "WiFi network names traced to her device address across multiple different locations.",
        "Has reposted multiple videos relating to new and upcoming softwares that are available for download.",
        "Posted in a forum online, “How to make a website look professional, quickly and easily?”"
      ],
      searchHistory: [
        "“What is the funniest name for a Wi–Fi”",
        "“What does cellular device update page look like”",
        "“How to embed download link”",
        "“Official software update ”"
      ]
    }
  ];
  