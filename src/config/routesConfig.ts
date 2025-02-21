export const ROUTES = {
  SIGN_UP: "/signup",
  SIGN_IN: "/signin",
  PROFILE: "/profile",
  AUCTIONS: "/auctions",
  AUCTION_DETAILS: (auctionId: string) => `/auctions/${auctionId}`,
  CREATE_AUCTION: (cardId: string) => `/auctions/create/${cardId}`,
  EDIT_AUCTION: (auctionId: string) => `/auctions/edit/${auctionId}`,
  CHATS: "/chats",
  CHAT: (id: string) => `/chats/${id}`,
  CREATE_CHAT: "/chats/create",
  CARDS: "/cards",
  CARD_DETAILS: (cardId: string) => `/cards/${cardId}`,
  USER_CARDS: "/",
  CREATE_CARD: "/cards/create",
  EDIT_CARD: (cardId: string) => `/cards/${cardId}/edit`,
  SETS: "/sets",
  CREATE_SET: "/sets/create",
  EDIT_SET: (setId: string) => `/sets/${setId}/edit`,
  CARDS_STATISTICS: "/statistics/cards",
  USERS_STATISTICS: "/statistics/users",
  SETS_STATISTICS: "/statistics/sets",
  USERS: "/users",
  TRANSACTIONS: "/transactions",
  TOP_UP: "/transactions/topUp",
  LOCATIONS: "/locations",
  CREATE_LOCATION: "/locations/create",
  EDIT_LOCATION: (locationId: number) => `/locations/edit/${locationId}`,
  EPISODES: "/episodes",
  CREATE_EPISODE: "/episodes/create",
  EDIT_EPISODE: (episodeId: number) => `/episodes/edit/${episodeId}`,
  SYSTEM_SETTINGS: "/settings",
};
