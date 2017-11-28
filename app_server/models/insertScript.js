conn = new Mongo();
db = conn.getDB('loc8r');

db.locations.insertOne({
      name: 'KFC',
      address: 'Strada Iuliu Maniu 1',
      rating: 5,
      facilities: ['Hot drinks', 'Premium WiFi', 'Food'],
      coords: [46.7701886, 23.5905202],
      openingTimes:
      [
        { days: 'Mon - Fri', opening: '07:00am', closing: '07:00pm', closed: false},
        { days: 'Sat', opening: '08:00am', closing: '05:00pm', closed: false},
        { days: 'Sun', time: '', closed:true}
      ],
      reviews:
      [
        {author: 'Steve Jobs', rating:5, timestamp:new Date('15 Nov 2017'), reviewText:'What a great place. I can\'t say enough good things \n about it.'},
        {author: 'Bill Gates', rating:5, timestamp:new Date('1 Oct 2017'), reviewText:'It was okay. Coffee wasn\'t great, but the wifi was fast.'}
      ]
});