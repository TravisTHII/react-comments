import { format, formatDistance } from 'date-fns'

export const SEED = {
	threadName: 'Hello',
	data: {
		hasPinned: false,
		has_comments: false,
		total: 0
	},
	pinned: null,
	comments: [
		{
			comment_id: "fiwt33CZIBC7HzzCsAiA",
			content: 
`Hatred and vengeance blinded me... But I shall stand before them in humility.
I shall remember the expression in their eyes.
I hope the memory of those eyes will stop me making a similar mistake.`,
			date: {
				published: formatDistance(1614745918 * 1000, Date.now(), { addSuffix: true }),
				posted: format(1614745918 * 1000, 'MMMM do, y | h:mm a'),
				timestamp: 1614745918 * 1000
			},
			reply: {
				has_replies: false,
				total: 0
			},
			user: {
				username: "Cirilla Fiona Elen Riannon",
				slug: "cirilla-fiona-elen-riannon",
				motto: "Lady of Space and Time",
				badge: {
					title: "Elder Blood",
					background_color: "teal",
					text_color: ""
				},
				verified: false,
				image: {
					"avatar": "/images/users/ciri.jpg"
				}
			},
			menu: [
				"Pin",
				"Edit",
				"Delete",
				"Remove",
				"Report"
			],
			data: {
				edited: false,
				pinned: false,
				reported: false,
				overflow: false
			}
		},
		{
			comment_id: "xiwt33CZIBC7HzzCsAiA",
			content: 
`No! I will not give in and I won't be swayed! I am the "Fourteenth of the Hill"!
I am not a little frightened girl from a dark Maribor Tower anymore...`,
			date: {
				published: formatDistance(1614660927 * 1000, Date.now(), { addSuffix: true }),
				posted: format(1614660927 * 1000, 'MMMM do, y | h:mm a'),
				timestamp: 1614660927 * 1000
			},
			reply: {
				has_replies: false,
				total: 0
			},
			user: {
				username: "Triss Merigold",
				slug: "triss-merigold",
				motto: "Merigold the Fearless",
				badge: {
					title: "Lodge of Sorceresses",
					background_color: "#ab0a0a",
					text_color: ""
				},
				verified: false,
				image: {
					"avatar": "/images/users/triss.jpg"
				}
			},
			menu: [
				"Pin",
				"Edit",
				"Delete",
				"Remove",
				"Report"
			],
			data: {
				edited: false,
				pinned: false,
				reported: false,
				overflow: false
			}
		},
		{
			comment_id: "Ziwt33CZIBC7HzzCsAiA",
			content: `It’s good to see you, Geralt. I…I’d even embrace you…were you not covered in blood.`,
			date: {
				published: formatDistance(1614401727 * 1000, Date.now(), { addSuffix: true }),
				posted: format(1614401727 * 1000, 'MMMM do, y | h:mm a'),
				timestamp: 1614401727 * 1000
			},
			reply: {
				has_replies: false,
				total: 0
			},
			user: {
				username: "Yennefer of Vengerberg",
				slug: "yennefer-of-vengerberg",
				motto: "Horsewoman of War",
				badge: {
					title: "Lodge of Sorceresses",
					background_color: "#ab0a0a",
					text_color: ""
				},
				verified: false,
				image: {
					"avatar": "/images/users/yennefer.jpg"
				}
			},
			menu: [
				"Pin",
				"Edit",
				"Delete",
				"Remove",
				"Report"
			],
			data: {
				edited: false,
				pinned: false,
				reported: false,
				overflow: false
			}
		},
		{
			comment_id: "Hiwt33CZIBC7HzzCsAiA",
			content: 
`Vesemir was the oldest living member of the Wolf School and most likely the oldest witcher of any school on the Continent.

About as long in years as the ruins of Kaer Morhen themselves and eternally complaining about his creaky bones, 
this master of the witcher trade gave no thought to a well-deserved retirement. Gray, but still spry, he continued to ply the monster hunting trade into his golden years – effectively, too, as he'd seen more beasts than all his students put together.

A harsh and demanding instructor in Geralt's youth, over the years he had become something of an adoptive father and mentor to the other witchers, 
always ready to help with sage advice and steady hands.

In the spring of 1272, when our story begins, Vesemir had joined Geralt on his search for Yennefer, trekking with him through war-ravaged Temeria.

Vesemir always said no witcher had ever died in his own bed, so death in combat surely awaited him as well. 
Death's waiting ended on the mournful day when the Wild Hunt descended on Kaer Morhen in pursuit of Ciri. 
Vesemir gave his all to protect his former ward, whom he had always treated like an adopted granddaughter, 
and died a hero's death at the hands of Imlerith, the Hunt's cruel general.`,
			date: {
				published: formatDistance(1613278527 * 1000, Date.now(), { addSuffix: true }),
				posted: format(1613278527 * 1000, 'MMMM do, y | h:mm a'),
				timestamp: 1613278527 * 1000
			},
			reply: {
				has_replies: false,
				total: 0
			},
			user: {
				username: "Vesemir",
				slug: "vesemir",
				motto: "School of the Wolf",
				badge: {
					title: "Witcher",
					background_color: "#7d7d7d",
					text_color: ""
				},
				verified: false,
				image: {
					"avatar": "/images/users/vesemir.jpg"
				}
			},
			menu: [
				"Pin",
				"Edit",
				"Delete",
				"Remove",
				"Report"
			],
			data: {
				edited: false,
				pinned: false,
				reported: false,
				overflow: true
			}
		},
		{
			comment_id: "Uiwt33CZIBC7HzzCsAiA",
			content:
`I don't believe in Melitele, don't believe in the existence of other gods either, but I respect your choice, your sacrifice. Your belief. Because your faith and sacrifice, the price you're paying for your silence, will make you a better, a greater being. Or, at least, it could. But my faithlessness can do nothing. It's powerless.

You ask me what I believe in, in that case

I believe in the sword`,
			date: {
				published: formatDistance(1611464127 * 1000, Date.now(), { addSuffix: true }),
				posted: format(1611464127 * 1000, 'MMMM do, y | h:mm a'),
				timestamp: 1611464127 * 1000
			},
			reply: {
				has_replies: false,
				total: 0
			},
			user: {
				username: "Geralt of Rivia",
				slug: "geralt-of-rivia",
				motto: "White Wolf",
				badge: {
					title: "Witcher",
					background_color: "#7d7d7d",
					text_color: ""
				},
				verified: false,
				image: {
					"avatar": "/images/users/geralt.jpg"
				}
			},
			menu: [
				"Pin",
				"Edit",
				"Delete",
				"Remove",
				"Report"
			],
			data: {
				edited: false,
				pinned: false,
				reported: false,
				overflow: false
			}
		},
	]
}