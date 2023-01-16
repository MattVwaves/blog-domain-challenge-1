const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdUser = await prisma.user.create({
    data: { username: "alicemart", email: "him@him.com" },
  });

  const createdProfile = await prisma.profile.create({
    data: {
      picture: "alicemart",
      bio: "this and that",
      user: { connect: { id: createdUser.id } },
    },
  });

  const createdPost = await prisma.post.create({
    data: {
      title: "what a post geeez!:):)",
      content: "yes it is THIS good, you're right...",
      published: true,
      user: { connect: { id: createdUser.id } },
    },
  });

  const createdComment = await prisma.comment.create({
    data: {
      content: "this is SOME post friend",
      user: { connect: { id: createdUser.id } },
      post: { connect: { id: createdPost.id } },
    },
  });

  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
