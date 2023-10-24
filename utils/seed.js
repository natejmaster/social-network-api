const { User, Thought, Reaction } = require(`../models`);

const seedData = async () => {
  try {
    // Create users
    const users = await User.insertMany([
      {
        username: 'user1',
        email: 'user1@example.com',
      },
      {
        username: 'user2',
        email: 'user2@example.com',
      },
      {
        username: 'user3',
        email: 'user3@example.com',
      },
      {
        username: 'user4',
        email: 'user4@example.com',
      },
      {
        username: 'user5',
        email: 'user5@example.com',
      },
      {
        username: 'user6',
        email: 'user6@example.com',
      },
      {
        username: 'user7',
        email: 'user7@example.com',
      },
      {
        username: 'user8',
        email: 'user8@example.com',
      },
    ]);

    // Create thoughts for each user
    const thoughts = [];
    for (const user of users) {
      for (let i = 0; i < 10; i++) {
        thoughts.push({
          thoughtText: `Thought ${i} from ${user.username}`,
          username: user._id,
        });
      }
    }
    const createdThoughts = await Thought.insertMany(thoughts);

    // Create reactions for each thought
    const reactions = [];
    for (const thought of createdThoughts) {
      for (let i = 0; i < 5; i++) {
        reactions.push({
          reactionBody: `Reaction ${i} to thought ${thought._id}`,
          username: users[i % users.length]._id,
        });
      }
    }
    await Reaction.insertMany(reactions);

    console.log('Seed data created successfully');
  } catch (err) {
    console.error(err);
  }
};

seedData();
