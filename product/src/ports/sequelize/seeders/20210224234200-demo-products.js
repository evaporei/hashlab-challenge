const tableName = 'products'

const today = new Date()

module.exports = {
  up: queryInterface => queryInterface.bulkInsert(tableName, [
      {
        id: 'prd_cklk9ynb1000001rt6nzydsfv',
        price: 10000,
        title: 'Bike',
        description: 'cool bike',
        created_at: today,
        updated_at: today,
      },
      {
        id: 'prd_cklk9ynb2000101rt289h81ox',
        price: 5000,
        title: 'Video-game',
        description: 'bad video-game, it\'s broken',
        created_at: today,
        updated_at: today,
      },
      {
        id: 'prd_cklk9ynb2000201rt7boy636h',
        price: 23000,
        title: 'Bag',
        description: 'it\'s prada',
        created_at: today,
        updated_at: today,
      },
      {
        id: 'prd_cklk9ynb2000301rt85rx6z9o',
        price: 560000,
        title: 'Camera',
        description: 'very expensive',
        created_at: today,
        updated_at: today,
      },
      {
        id: 'prd_cklk9ynb2000401rtb6mn2nw0',
        price: 560000,
        title: 'Camera',
        description: 'very expensive',
        created_at: today,
        updated_at: today,
      },
      {
        id: 'prd_cklk9ynb2000501rthpj344n4',
        price: 123321,
        title: 'Shoes',
        description: 'brand new!',
        created_at: today,
        updated_at: today,
      },
      {
        id: 'prd_cklk9ynb2000601rt25qwg0ke',
        price: 123321,
        title: 'Water Bottle',
        description: 'water goes inside ;)',
        created_at: today,
        updated_at: today,
      },
      {
        id: 'prd_cklk9ynb2000701rt2sv41l15',
        price: 456444,
        title: 'Elvis Guitar',
        description: 'if you search inside, Elvis is there :O',
        created_at: today,
        updated_at: today,
      },
      {
        id: 'prd_cklk9ynb2000801rt12y0cshh',
        price: 99999999,
        title: 'Mac computer',
        description: 'buy it at Donalds restaurants',
        created_at: today,
        updated_at: today,
      },
      {
        id: 'prd_cklk9ynb2000901rt0o1mb1yq',
        price: 1,
        title: 'A penny',
        description: 'why the heck would you buy a penny?',
        created_at: today,
        updated_at: today,
      },
      {
        id: 'prd_cklka2jws000001mz1xbx8rhb',
        price: 500,
        title: 'Cookies',
        description: 'they have chocolate',
        created_at: today,
        updated_at: today,
      },
      {
        id: 'prd_cklka2jwt000101mza53827hh',
        price: 1050,
        title: 'Cake',
        description: 'there\'s no cake',
        created_at: today,
        updated_at: today,
      },
      {
        id: 'prd_cklka2jwt000201mz7dkh574s',
        price: 1050,
        title: 'Determination',
        description: 'it\'s actually a flower, it seems angry for some reason',
        created_at: today,
        updated_at: today,
      },
      {
        id: 'prd_cklka2jwt000301mzcui7747a',
        price: 8450,
        title: 'Green Card',
        description: 'it\'s actually a marriage contract',
        created_at: today,
        updated_at: today,
      },
      {
        id: 'prd_cklka2jwt000401mzbfxbcdlw',
        price: 13450,
        title: 'TV',
        description: 'you can watch BBB in it, or play some games I guess',
        created_at: today,
        updated_at: today,
      },
      {
        id: 'prd_cklka2jwt000501mz9laf0l0j',
        price: 750,
        title: 'Mug',
        description: 'fill it with coffee, chocolate or tea',
        created_at: today,
        updated_at: today,
      },
      {
        id: 'prd_cklka2jwt000601mz2em49jkp',
        price: 1500,
        title: 'Pokémon Card Pack',
        description: 'maybe there\'s a blastoise in this pack, who knows?',
        created_at: today,
        updated_at: today,
      },
      {
        id: 'prd_cklka2jwt000701mze5pi587l',
        price: 40033,
        title: 'Skate',
        description: 'you could be Tony Hawk, in your dreams',
        created_at: today,
        updated_at: today,
      },
      {
        id: 'prd_cklka2jwt000801mz9c8pg2a9',
        price: 303030,
        title: 'Half a Sandwich',
        description: 'someone eat half of it',
        created_at: today,
        updated_at: today,
      },
      {
        id: 'prd_cklka2jwt000901mz1i936zru',
        price: 303030,
        title: 'The other half of the Sandwich',
        description: 'it wasn\'t eaten, just badly cut',
        created_at: today,
        updated_at: today,
      },
    ]),
  down: queryInterface =>
    queryInterface.bulkDelete(tableName, null, {})
}
