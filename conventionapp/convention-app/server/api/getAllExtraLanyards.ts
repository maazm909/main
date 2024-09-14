import Prisma from "@prisma/client";

const prisma = new Prisma.PrismaClient();

export default defineEventHandler(async () => {
  try {
    let totalSum = 0;
    let response = await prisma.attendee.aggregate({
      _sum: {
        extraLanyards: true,
      },
    });
    totalSum += response._sum?.extraLanyards ?? 0;
    response = await prisma.onlineGroup.aggregate({
      _sum: {
        extraLanyards: true,
      },
    });
    totalSum += response._sum?.extraLanyards ?? 0;
    // response = await prisma.bazaarSponsorGroup.aggregate({
    //   _sum: {
    //     extraLanyards: true,
    //   },
    // });
    // totalSum += response._sum?.extraLanyards ?? 0;
    // response = await prisma.speakerAndGroup.aggregate({
    //   _sum: {
    //     extraLanyards: true,
    //   },
    // });
    // totalSum += response._sum?.extraLanyards ?? 0;
    response = await prisma.ticketHolder.aggregate({
      _sum: {
        extraLanyards: true,
      },
    });
    totalSum += response._sum?.extraLanyards ?? 0;
    return totalSum;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    console.error("failed get all extra lanyards: ", error.message);
  }
});
