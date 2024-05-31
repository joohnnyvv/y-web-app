import { UserAvatarColors } from "../Models/UserModel";
import { Comment } from "../Models/CommentModel";

export const mockedComments: Comment[] = [
 {
    id: 101,
    content: "This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment. This is a sample comment.",
    user: {
      id: 456,
      name: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      avatarColor: UserAvatarColors.lightGreen,
      isActive: true
    },
    likesCount: 10,
    isLikedByMe: false,
    date: "2024-05-27T14:00:00Z"
  },
  {
    id: 102,
    content: "Another insightful comment.",
    user: {
      id: 457,
      name: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      avatarColor: UserAvatarColors.yellow,
      isActive: false
    },
    likesCount: 25,
    isLikedByMe: true,
    date: "2024-05-27T15:00:00Z"
  },
  {
    id: 103,
    content: "I agree with this point.",
    user: {
      id: 458,
      name: "Emily",
      lastName: "Clark",
      email: "emily.clark@example.com",
      avatarColor: UserAvatarColors.lightPink,
      isActive: true
    },
    likesCount: 15,
    isLikedByMe: false,
    date: "2024-05-27T16:00:00Z"
  },
  {
    id: 104,
    content: "Interesting perspective.",
    user: {
      id: 459,
      name: "Michael",
      lastName: "Brown",
      email: "michael.brown@example.com",
      avatarColor: UserAvatarColors.brown,
      isActive: false
    },
    likesCount: 5,
    isLikedByMe: false,
    date: "2024-05-27T17:00:00Z"
  },
  {
    id: 105,
    content: "Thanks for sharing this!",
    user: {
      id: 460,
      name: "Sarah",
      lastName: "Wilson",
      email: "sarah.wilson@example.com",
      avatarColor: UserAvatarColors.gray,
      isActive: true
    },
    likesCount: 8,
    isLikedByMe: true,
    date: "2024-05-27T18:00:00Z"
  },
  {
    id: 106,
    content: "This is really helpful.",
    user: {
      id: 461,
      name: "David",
      lastName: "Martinez",
      email: "david.martinez@example.com",
      avatarColor: UserAvatarColors.lightGreen,
      isActive: false
    },
    likesCount: 12,
    isLikedByMe: false,
    date: "2024-05-27T19:00:00Z"
  },
  {
    id: 107,
    content: "Great job!",
    user: {
      id: 462,
      name: "Sophia",
      lastName: "Garcia",
      email: "sophia.garcia@example.com",
      avatarColor: UserAvatarColors.yellow,
      isActive: true
    },
    likesCount: 22,
    isLikedByMe: true,
    date: "2024-05-27T20:00:00Z"
  },
  {
    id: 108,
    content: "I learned something new.",
    user: {
      id: 463,
      name: "Daniel",
      lastName: "Anderson",
      email: "daniel.anderson@example.com",
      avatarColor: UserAvatarColors.lightPink,
      isActive: false
    },
    likesCount: 18,
    isLikedByMe: false,
    date: "2024-05-27T21:00:00Z"
  },
  {
    id: 109,
    content: "Very informative!",
    user: {
      id: 464,
      name: "Olivia",
      lastName: "Hernandez",
      email: "olivia.hernandez@example.com",
      avatarColor: UserAvatarColors.brown,
      isActive: true
    },
    likesCount: 30,
    isLikedByMe: true,
    date: "2024-05-27T22:00:00Z"
  },
  {
    id: 110,
    content: "Well explained.",
    user: {
      id: 465,
      name: "Lucas",
      lastName: "Young",
      email: "lucas.young@example.com",
      avatarColor: UserAvatarColors.gray,
      isActive: false
    },
    likesCount: 20,
    isLikedByMe: false,
    date: "2024-05-27T23:00:00Z"
  },
  {
    id: 111,
    content: "Good read!",
    user: {
      id: 466,
      name: "Mia",
      lastName: "King",
      email: "mia.king@example.com",
      avatarColor: UserAvatarColors.lightGreen,
      isActive: true
    },
    likesCount: 11,
    isLikedByMe: false,
    date: "2024-05-28T00:00:00Z"
  },
  {
    id: 112,
    content: "Couldn't agree more.",
    user: {
      id: 467,
      name: "James",
      lastName: "Scott",
      email: "james.scott@example.com",
      avatarColor: UserAvatarColors.yellow,
      isActive: true
    },
    likesCount: 16,
    isLikedByMe: true,
    date: "2024-05-28T01:00:00Z"
  },
  {
    id: 113,
    content: "Thought-provoking.",
    user: {
      id: 468,
      name: "Ella",
      lastName: "Lopez",
      email: "ella.lopez@example.com",
      avatarColor: UserAvatarColors.lightPink,
      isActive: false
    },
    likesCount: 9,
    isLikedByMe: false,
    date: "2024-05-28T02:00:00Z"
  },
  {
    id: 114,
    content: "Thanks for the insight.",
    user: {
      id: 469,
      name: "Benjamin",
      lastName: "Harris",
      email: "benjamin.harris@example.com",
      avatarColor: UserAvatarColors.brown,
      isActive: true
    },
    likesCount: 14,
    isLikedByMe: true,
    date: "2024-05-28T03:00:00Z"
  },
  {
    id: 115,
    content: "Interesting take.",
    user: {
      id: 470,
      name: "Charlotte",
      lastName: "Clark",
      email: "charlotte.clark@example.com",
      avatarColor: UserAvatarColors.gray,
      isActive: false
    },
    likesCount: 6,
    isLikedByMe: false,
    date: "2024-05-28T04:00:00Z"
  },
  {
    id: 116,
    content: "Helpful information.",
    user: {
      id: 471,
      name: "Henry",
      lastName: "Ramirez",
      email: "henry.ramirez@example.com",
      avatarColor: UserAvatarColors.lightGreen,
      isActive: true
    },
    likesCount: 13,
    isLikedByMe: true,
    date: "2024-05-28T05:00:00Z"
  },
  {
    id: 117,
    content: "Great post!",
    user: {
      id: 472,
      name: "Amelia",
      lastName: "White",
      email: "amelia.white@example.com",
      avatarColor: UserAvatarColors.yellow,
      isActive: false
    },
    likesCount: 21,
    isLikedByMe: false,
    date: "2024-05-28T06:00:00Z"
  },
  {
    id: 118,
    content: "I enjoyed this read.",
    user: {
      id: 473,
      name: "Ethan",
      lastName: "Thompson",
      email: "ethan.thompson@example.com",
      avatarColor: UserAvatarColors.lightPink,
      isActive: true
    },
    likesCount: 17,
    isLikedByMe: true,
    date: "2024-05-28T07:00:00Z"
  },
];