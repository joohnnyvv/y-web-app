import { User, UserAvatarColors } from "../Models/UserModel";

export const mockedUsers: User[] = [
  { id: 1, name: "John", lastName: "Doe", followersCount: 150, isFollowingCount: 100, avatarColor: UserAvatarColors.yellow, isActive: true, isFollowedByUser: true, email: "john.doe@example.com" },
  { id: 2, name: "Jane", lastName: "Smith", followersCount: 200, isFollowingCount: 180, avatarColor: UserAvatarColors.brown, isActive: true, isFollowedByUser: false, email: "jane.smith@example.com" },
  { id: 3, name: "Mike", lastName: "Johnson", followersCount: 300, isFollowingCount: 250, avatarColor: UserAvatarColors.lightPink, isActive: true, isFollowedByUser: true, email: "mike.johnson@example.com" },
  { id: 4, name: "Sara", lastName: "Wilson", followersCount: 400, isFollowingCount: 350, avatarColor: UserAvatarColors.lightGreen, isActive: false, isFollowedByUser: false, email: "sara.wilson@example.com" },
  { id: 5, name: "Chris", lastName: "Brown", followersCount: 500, isFollowingCount: 450, avatarColor: UserAvatarColors.gray, isActive: false, isFollowedByUser: true, email: "chris.brown@example.com" },
  { id: 6, name: "Emily", lastName: "Clark", followersCount: 600, isFollowingCount: 550, avatarColor: UserAvatarColors.lightGreen, isActive: true, isFollowedByUser: false, email: "emily.clark@example.com" },
  { id: 7, name: "James", lastName: "Green", followersCount: 700, isFollowingCount: 650, avatarColor: UserAvatarColors.yellow, isActive: true, isFollowedByUser: true, email: "james.green@example.com" },
  { id: 8, name: "Olivia", lastName: "Martinez", followersCount: 800, isFollowingCount: 750, avatarColor: UserAvatarColors.lightPink, isActive: true, isFollowedByUser: false, email: "olivia.martinez@example.com" },
  { id: 9, name: "Liam", lastName: "Moore", followersCount: 900, isFollowingCount: 850, avatarColor: UserAvatarColors.yellow, isActive: false, isFollowedByUser: true, email: "liam.moore@example.com" },
  { id: 10, name: "Ava", lastName: "Taylor", followersCount: 1000, isFollowingCount: 950, avatarColor: UserAvatarColors.brown, isActive: true, isFollowedByUser: false, email: "ava.taylor@example.com" },
  { id: 11, name: "Noah", lastName: "Anderson", followersCount: 1100, isFollowingCount: 1050, avatarColor: UserAvatarColors.lightGreen, isActive: true, isFollowedByUser: true, email: "noah.anderson@example.com" },
  { id: 12, name: "Isabella", lastName: "Thomas", followersCount: 1200, isFollowingCount: 1150, avatarColor: UserAvatarColors.gray, isActive: false, isFollowedByUser: false, email: "isabella.thomas@example.com" },
  { id: 13, name: "Sophia", lastName: "Lee", followersCount: 1300, isFollowingCount: 1250, avatarColor: UserAvatarColors.yellow, isActive: false, isFollowedByUser: true, email: "sophia.lee@example.com" },
  { id: 14, name: "Mason", lastName: "Walker", followersCount: 1400, isFollowingCount: 1350, avatarColor: UserAvatarColors.lightGreen, isActive: false, isFollowedByUser: false, email: "mason.walker@example.com" },
  { id: 15, name: "Mia", lastName: "Hall", followersCount: 1500, isFollowingCount: 1450, avatarColor: UserAvatarColors.yellow, isActive: false, isFollowedByUser: true, email: "mia.hall@example.com" },
  { id: 16, name: "Lucas", lastName: "Young", followersCount: 1600, isFollowingCount: 1550, avatarColor: UserAvatarColors.yellow, isActive: true, isFollowedByUser: false, email: "lucas.young@example.com" },
  { id: 17, name: "Amelia", lastName: "King", followersCount: 1700, isFollowingCount: 1650, avatarColor: UserAvatarColors.lightGreen, isActive: true, isFollowedByUser: true, email: "amelia.king@example.com" },
  { id: 18, name: "Benjamin", lastName: "Scott", followersCount: 1800, isFollowingCount: 1750, avatarColor: UserAvatarColors.yellow, isActive: true, isFollowedByUser: false, email: "benjamin.scott@example.com" },
  { id: 19, name: "Charlotte", lastName: "Green", followersCount: 1900, isFollowingCount: 1850, avatarColor: UserAvatarColors.gray, isActive: true, isFollowedByUser: true, email: "charlotte.green@example.com" },
  { id: 20, name: "Elijah", lastName: "Baker", followersCount: 2000, isFollowingCount: 1950, avatarColor: UserAvatarColors.yellow, isActive: false, isFollowedByUser: false, email: "elijah.baker@example.com" },
];
