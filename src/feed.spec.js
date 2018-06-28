import Feed from './feed'

let sampleDate = new Date('Sat, 13 Jul 2013 23:00:00 GMT');

let feed = new Feed({
  title: 'Feed Title',
  description: 'This is my personnal feed!',
  link: 'http://example.com/',
  id: 'http://example.com/',
  feed: 'http://example.com/feed.rss',
  image: 'http://example.com/image.png',
  copyright: 'All rights reserved 2013, John Doe',
  updated: sampleDate, // optional, default = today
  generator: 'awesome', // optional, default = 'Feed for Node.js'
  author: {
    name: 'John Doe',
    email: 'johndoe@example.com',
    link: 'https://example.com/johndoe'
  }
})

feed.addCategory('Technology')
feed.addCustomField('geo:lat')

feed.addContributor({
  name: 'Johan Cruyff',
  email: 'johancruyff@example.com',
  link: 'https://example.com/johancruyff'
})

feed.addItem({
  title: 'Hello World',
  id: 'https://example.com/hello-world',
  link: 'https://example.com/hello-world',
  description: 'This is an article about Hello World.',
  'geo:lat': 23,
  author: [{
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    link: 'https://example.com/janedoe'
  }, {
    name: 'Joe Smith',
    email: 'joesmith@example.com',
    link: 'https://example.com/joesmith'
  }],
  contributor: [{
    name: 'Shawn Kemp',
    email: 'shawnkemp@example.com',
    link: 'https://example.com/shawnkemp'
  }, {
    name: 'Reggie Miller',
    email: 'reggiemiller@example.com',
    link: 'https://example.com/reggiemiller'
  }],
  extensions: [{
    name: '_item_extension_1',
    objects: {
      about: 'just an item extension example',
      dummy1: 'example'
    }
  },
  {
    name: '_item_extension_2',
    objects: {
      about: 'just a second item extension example',
      dummy1: 'example'
    }
  }],
  date: sampleDate,
  // torrent: 'https://example.com/hello-world.torrent'
  torrent: [{
    title: 'Hello World',
    url: 'https://example.com/hello-world.torrent',
    size_in_bytes: 42
  }],
  // thumbnail: 'https://example.com/hello-world.png'
  thumbnail: [{
    url: 'https://example.com/hello-world.png',
    height: 320,
    width: 560,
    time: "12:05:01.123"
  }]
})

feed.addExtension({
  name: '_example_extension',
  objects: {
    about: 'just an extension example',
    dummy: 'example'
  }
});

test('it should generate an RSS 2.0 feed', () => {
  let expected = `<?xml version=\"1.0\" encoding=\"utf-8\"?>
<rss version=\"2.0\" xmlns:atom=\"http://www.w3.org/2005/Atom\">
    <channel>
        <title>Feed Title</title>
        <link>http://example.com/</link>
        <description>This is my personnal feed!</description>
        <lastBuildDate>Sat, 13 Jul 2013 23:00:00 GMT</lastBuildDate>
        <docs>http://blogs.law.harvard.edu/tech/rss</docs>
        <generator>awesome</generator>
        <image>
            <title>Feed Title</title>
            <url>http://example.com/image.png</url>
            <link>http://example.com/</link>
        </image>
        <copyright>All rights reserved 2013, John Doe</copyright>
        <category>Technology</category>
        <atom:link href=\"http://example.com/feed.rss\" rel=\"self\" type=\"application/rss+xml\"/>
        <item>
            <geo:lat>23</geo:lat>
            <title><![CDATA[Hello World]]></title>
            <link>https://example.com/hello-world</link>
            <guid>https://example.com/hello-world</guid>
            <pubDate>Sat, 13 Jul 2013 23:00:00 GMT</pubDate>
            <description><![CDATA[This is an article about Hello World.]]></description>
            <author>janedoe@example.com (Jane Doe)</author>
            <enclosure type="application/x-bittorrent" url="https://example.com/hello-world.torrent" length="42">
            </enclosure>
            <media:thumbnail url="https://example.com/hello-world.png" height="320" width="560" time="12:05:01.123">
            </media:thumbnail>
        </item>
    </channel>
</rss>`;

  let actual = feed.rss2()

  expect(actual).toBe(expected)
});

test('it should generate an Atom 1.0 feed', () => {
  let expected = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <id>http://example.com/</id>
    <title>Feed Title</title>
    <updated>2013-07-13T23:00:00Z</updated>
    <generator>awesome</generator>
    <author>
        <name>John Doe</name>
        <email>johndoe@example.com</email>
        <uri>https://example.com/johndoe</uri>
    </author>
    <link rel="alternate" href="http://example.com/"/>
    <link rel="self" href="http://example.com/feed.rss"/>
    <subtitle>This is my personnal feed!</subtitle>
    <logo>http://example.com/image.png</logo>
    <rights>All rights reserved 2013, John Doe</rights>
    <category term="Technology">
    </category>
    <contributor>
        <name>Johan Cruyff</name>
        <email>johancruyff@example.com</email>
        <uri>https://example.com/johancruyff</uri>
    </contributor>
    <entry>
        <title type="html"><![CDATA[Hello World]]></title>
        <id>https://example.com/hello-world</id>
        <link href="https://example.com/hello-world">
        </link>
        <updated>2013-07-13T23:00:00Z</updated>
        <summary type="html"><![CDATA[This is an article about Hello World.]]></summary>
        <author>
            <name>Jane Doe</name>
            <email>janedoe@example.com</email>
            <uri>https://example.com/janedoe</uri>
        </author>
        <author>
            <name>Joe Smith</name>
            <email>joesmith@example.com</email>
            <uri>https://example.com/joesmith</uri>
        </author>
        <contributor>
            <name>Shawn Kemp</name>
            <email>shawnkemp@example.com</email>
            <uri>https://example.com/shawnkemp</uri>
        </contributor>
        <contributor>
            <name>Reggie Miller</name>
            <email>reggiemiller@example.com</email>
            <uri>https://example.com/reggiemiller</uri>
        </contributor>
    </entry>
</feed>`;

  let actual = feed.atom1()

  expect(actual).toBe(expected)
});

test('it should generate a JSON v1 feed', () => {
    let expected = {
        "author": {
            "name": "John Doe",
            "url": "https://example.com/johndoe"
        },
        "description": "This is my personnal feed!",
        "home_page_url": "http://example.com/",
        "icon": "http://example.com/image.png",
        "items": [{
            "author": {
                "name": "Jane Doe",
                "url": "https://example.com/janedoe"
            },
            "date_modified": "2013-07-13T23:00:00Z",
            "id": "https://example.com/hello-world",
            "summary": "This is an article about Hello World.",
            "title": "Hello World",
            "url": "https://example.com/hello-world",
            "_item_extension_1": {
              "about": "just an item extension example",
              "dummy1": "example"
            },
            "_item_extension_2": {
              "about": "just a second item extension example",
              "dummy1": "example"
            },
            "attachments": [
              {
                "mime_type": "application/x-bittorrent",
                "title": "Hello World",
                "url": "https://example.com/hello-world.torrent",
                "size_in_bytes": 42
              }
            ]
        }],
        "_example_extension": {
          "about": "just an extension example",
          "dummy": "example"
        },
        "title": "Feed Title",
        "version": "https://jsonfeed.org/version/1"
    };

    let actual = JSON.parse(feed.json1());

    expect(actual).toEqual(expected)
});


test('it should generate a Media RSS 1.5 feed', () => {
  feed.addItem({
    title: 'Hello World',
    id: 'https://example.com/hello-world',
    link: 'https://example.com/hello-world',
    description: 'This is an article about Hello World.',
    date: sampleDate,
    author: [{
      name: 'Jane Doe',
      link: 'jane.doe@example.com'
    }],
    torrent: [
      {
        url: 'https://example.com/hello-world-vp8-ogg.torrent'
      },
      {
        url: 'https://example.com/hello-world-vp9-opus.torrent'
      }
    ]
  });

  let expected = `<?xml version=\"1.0\" encoding=\"utf-8\"?>
<rss version=\"2.0\" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media=\"http://search.yahoo.com/mrss/\" xmlns:atom=\"http://www.w3.org/2005/Atom\">
    <channel>
        <title>Feed Title</title>
        <link>http://example.com/</link>
        <description>This is my personnal feed!</description>
        <lastBuildDate>Sat, 13 Jul 2013 23:00:00 GMT</lastBuildDate>
        <docs>http://blogs.law.harvard.edu/tech/rss</docs>
        <generator>awesome</generator>
        <image>
            <title>Feed Title</title>
            <url>http://example.com/image.png</url>
            <link>http://example.com/</link>
        </image>
        <copyright>All rights reserved 2013, John Doe</copyright>
        <category>Technology</category>
        <atom:link href=\"http://example.com/feed.rss\" rel=\"self\" type=\"application/rss+xml\"/>
        <item>
            <geo:lat>23</geo:lat>
            <title><![CDATA[Hello World]]></title>
            <link>https://example.com/hello-world</link>
            <guid>https://example.com/hello-world</guid>
            <pubDate>Sat, 13 Jul 2013 23:00:00 GMT</pubDate>
            <description><![CDATA[This is an article about Hello World.]]></description>
            <author>janedoe@example.com (Jane Doe)</author>
            <enclosure type="application/x-bittorrent" url="https://example.com/hello-world.torrent" length="42">
            </enclosure>
            <media:thumbnail url="https://example.com/hello-world.png" height="320" width="560" time="12:05:01.123">
            </media:thumbnail>
        </item>
        <item>
            <title><![CDATA[Hello World]]></title>
            <link>https://example.com/hello-world</link>
            <guid>https://example.com/hello-world</guid>
            <pubDate>Sat, 13 Jul 2013 23:00:00 GMT</pubDate>
            <description><![CDATA[This is an article about Hello World.]]></description>
            <dc:creator>Jane Doe</dc:creator>
            <enclosure type="application/x-bittorrent" url="https://example.com/hello-world-vp8-ogg.torrent">
            </enclosure>
            <media:group>
                <media:content type="application/x-bittorrent" url="https://example.com/hello-world-vp8-ogg.torrent" isDefault="true">
                </media:content>
                <media:content type="application/x-bittorrent" url="https://example.com/hello-world-vp9-opus.torrent">
                </media:content>
                <media:rating>nonadult</media:rating>
            </media:group>
        </item>
    </channel>
</rss>`;

  let actual = feed.rss2()

  expect(actual).toBe(expected)
});