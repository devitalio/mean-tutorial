conn = new Mongo();
db = conn.getDB('loc8r');

db.locations.insertOne(
  {
    name : "La Rochelle",
    address : "str. Traian 2",
    rating : 5,
    facilities : [ "Hot drinks", "Premium WiFi"],
    coords : [ 46.776446, 23.590588 ],
    openingTimes :
    [
        { days : "Mon - Fri", opening : "07:00am", closing : "07:00pm", closed : false },
        { days : "Sat", opening : "08:00am", closing : "05:00pm", closed : false},
        { days : "Sun", time : "", closed : true}
    ],
    reviews :
    [
        { _id: ObjectId(), author : "Steve Jobs", rating : 5, timestamp : ISODate("2017-07-15T21:00:00Z"), reviewText : "What a great place. I can't say enough good things \n about it." }
    ]
});

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
        { _id: ObjectId(), author: 'Steve Jobs', rating:5, timestamp:new Date('15 Nov 2017'), reviewText:'What a great place. I can\'t say enough good things \n about it.'},
        { _id: ObjectId(), author: 'Bill Gates', rating:5, timestamp:new Date('1 Oct 2017'), reviewText:'It was okay. Coffee wasn\'t great, but the wifi was fast.'}
      ]
});