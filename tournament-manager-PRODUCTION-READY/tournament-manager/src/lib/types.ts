// Enums
export enum TournamentStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum MatchStatus {
  SCHEDULED = 'SCHEDULED',
  WAITING_TEAMS = 'WAITING_TEAMS',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export enum RoundType {
  GROUP_STAGE = 'GROUP_STAGE',
  ROUND_ROBIN = 'ROUND_ROBIN',
  ROUND_OF_16 = 'ROUND_OF_16',
  QUARTERFINALS = 'QUARTERFINALS',
  SEMIFINALS = 'SEMIFINALS',
  FINALS = 'FINALS'
}

export enum UserRole {
  ADMIN = 'ADMIN',
  ORGANIZER = 'ORGANIZER',
  TEAM_MANAGER = 'TEAM_MANAGER',
  SPECTATOR = 'SPECTATOR'
}

// Types
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  organizationId: string
  createdAt: Date
  updatedAt: Date
}

export interface Tournament {
  id: string
  name: string
  description?: string
  status: TournamentStatus
  organizationId: string
  format: string
  categoryId: string
  startDate: Date
  endDate: Date
  maxTeams: number
  matchDurationMinutes: number
  breakBetweenMatches: number
  courtCount: number
  createdAt: Date
  updatedAt: Date
}

export interface Team {
  id: string
  name: string
  player1Id: string
  player2Id: string
  organizationId: string
  createdAt: Date
  updatedAt: Date
}

export interface Match {
  id: string
  tournamentId: string
  homeTeamId: string
  awayTeamId: string
  status: MatchStatus
  scheduledAt?: Date
  courtId?: string
  round?: RoundType
  createdAt: Date
  updatedAt: Date
}

export interface Standing {
  id: string
  teamId: string
  tournamentId: string
  zoneId?: string
  position?: number
  matchesPlayed: number
  wins: number
  losses: number
  draws: number
  points: number
  pointsFor: number
  pointsAgainst: number
  updatedAt: Date
}

// API Response Types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
  statusCode: number
}

export interface CreateTournamentInput {
  name: string
  description?: string
  categoryId: string
  format: string
  startDate: Date
  endDate: Date
  maxTeams: number
  minTeamsPerZone?: number
  hasZones?: boolean
  matchDurationMinutes: number
  breakBetweenMatches: number
  courtCount: number
}

export interface SmartSchedulerResponse {
  selectedMatch: Match & {
    homeTeam: Team
    awayTeam: Team
    court?: { id: string; name: string }
  }
  topRecommendations: Array<{
    matchId: string
    score: number
    confidence: 'HIGH' | 'MEDIUM' | 'LOW'
    reasoning: string[]
    breakdown: {
      waitingScore: number
      zoneBalance: number
      fatigueScore: number
      momentumScore: number
      balanceScore: number
      schedulingScore: number
      synergyScore: number
    }
  }>
  contextSnapshot: {
    totalTeams: number
    teamsWaiting: number
    matchesScheduled: number
    courtsAvailable: number
  }
}

export interface FeedbackData {
  matchId: string
  tournamentId: string
  rating: 'good' | 'bad'
  comment?: string
  timestamp: Date
}

export interface ABTestResult {
  variantId: string
  matchesGenerated: number
  avgWaitingTime: number
  userSatisfaction: number
  participantsCompleted: number
}
