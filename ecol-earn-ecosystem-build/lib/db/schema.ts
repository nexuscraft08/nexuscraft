import { pgTable, text, integer, timestamp, real, boolean, jsonb, varchar, serial, foreignKey, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table - stores learner profiles
export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    username: varchar('username', { length: 50 }).notNull().unique(),
    displayName: varchar('display_name', { length: 100 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    avatar: text('avatar'),
    coverImage: text('cover_image'),
    bio: text('bio'),
    tagline: varchar('tagline', { length: 200 }),
    currentLevel: integer('current_level').default(1),
    totalXP: integer('total_xp').default(0),
    streak: integer('streak').default(0),
    lastActivityDate: timestamp('last_activity_date'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    index('idx_username').on(table.username),
    index('idx_created_at').on(table.createdAt),
  ]
);

// User profiles extended
export const userProfiles = pgTable(
  'user_profiles',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    education: text('education'),
    experience: text('experience'),
    location: varchar('location', { length: 100 }),
    website: varchar('website', { length: 255 }),
    github: varchar('github', { length: 255 }),
    linkedin: varchar('linkedin', { length: 255 }),
    twitter: varchar('twitter', { length: 255 }),
    isPublic: boolean('is_public').default(true),
    theme: varchar('theme', { length: 50 }).default('dark'),
    language: varchar('language', { length: 10 }).default('en'),
  },
  (table) => [
    foreignKey({ columns: [table.userId], foreignColumns: [users.id], name: 'fk_user_profiles_user_id' }),
  ]
);

// Skills table
export const skills = pgTable(
  'skills',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 100 }).notNull(),
    category: varchar('category', { length: 50 }).notNull(),
    proficiencyLevel: varchar('proficiency_level', { length: 20 }).default('beginner'), // beginner, intermediate, advanced, expert
    proficiencyPercentage: integer('proficiency_percentage').default(0),
    endorsements: integer('endorsements').default(0),
    lastUsedDate: timestamp('last_used_date'),
    yearsOfExperience: real('years_of_experience').default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    foreignKey({ columns: [table.userId], foreignColumns: [users.id], name: 'fk_skills_user_id' }),
    index('idx_skills_user_id').on(table.userId),
    index('idx_skills_category').on(table.category),
  ]
);

// Projects table
export const projects = pgTable(
  'projects',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 200 }).notNull(),
    description: text('description').notNull(),
    image: text('image'),
    techStack: jsonb('tech_stack').$type<string[]>().default([]),
    githubUrl: varchar('github_url', { length: 255 }),
    liveUrl: varchar('live_url', { length: 255 }),
    likes: integer('likes').default(0),
    views: integer('views').default(0),
    category: varchar('category', { length: 50 }),
    status: varchar('status', { length: 20 }).default('completed'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    foreignKey({ columns: [table.userId], foreignColumns: [users.id], name: 'fk_projects_user_id' }),
    index('idx_projects_user_id').on(table.userId),
  ]
);

// Certificates table
export const certificates = pgTable(
  'certificates',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 200 }).notNull(),
    issuer: varchar('issuer', { length: 200 }).notNull(),
    issuedDate: timestamp('issued_date').notNull(),
    expiryDate: timestamp('expiry_date'),
    credentialId: varchar('credential_id', { length: 255 }),
    credentialUrl: varchar('credential_url', { length: 255 }),
    isVerified: boolean('is_verified').default(true),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    foreignKey({ columns: [table.userId], foreignColumns: [users.id], name: 'fk_certificates_user_id' }),
    index('idx_certificates_user_id').on(table.userId),
  ]
);

// Activities table
export const activities = pgTable(
  'activities',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 50 }).notNull(), // course_completed, badge_earned, project_created, skill_learned, achievement_unlocked
    title: varchar('title', { length: 200 }).notNull(),
    description: text('description'),
    icon: varchar('icon', { length: 50 }),
    metadata: jsonb('metadata'),
    timestamp: timestamp('timestamp').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    foreignKey({ columns: [table.userId], foreignColumns: [users.id], name: 'fk_activities_user_id' }),
    index('idx_activities_user_id').on(table.userId),
    index('idx_activities_timestamp').on(table.timestamp),
  ]
);

// Connections table
export const connections = pgTable(
  'connections',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    connectedUserId: integer('connected_user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    status: varchar('status', { length: 20 }).default('connected'), // connected, following, suggested
    mutualConnections: integer('mutual_connections').default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    foreignKey({ columns: [table.userId], foreignColumns: [users.id], name: 'fk_connections_user_id' }),
    foreignKey({ columns: [table.connectedUserId], foreignColumns: [users.id], name: 'fk_connections_connected_user_id' }),
    index('idx_connections_user_id').on(table.userId),
    uniqueIndex('idx_connections_unique').on(table.userId, table.connectedUserId),
  ]
);

// Analytics snapshots
export const analyticsSnapshots = pgTable(
  'analytics_snapshots',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    date: timestamp('date').defaultNow().notNull(),
    xpGained: integer('xp_gained').default(0),
    studyTimeMinutes: integer('study_time_minutes').default(0),
    skillsLearned: integer('skills_learned').default(0),
    projectsCompleted: integer('projects_completed').default(0),
    performanceScore: integer('performance_score').default(0),
  },
  (table) => [
    foreignKey({ columns: [table.userId], foreignColumns: [users.id], name: 'fk_analytics_user_id' }),
    index('idx_analytics_user_id').on(table.userId),
    index('idx_analytics_date').on(table.date),
  ]
);

// AI Insights table
export const aiInsights = pgTable(
  'ai_insights',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 50 }).notNull(), // skill_gap, learning_path, performance, career_path, recommendation
    title: varchar('title', { length: 200 }).notNull(),
    description: text('description').notNull(),
    icon: varchar('icon', { length: 50 }),
    actionUrl: varchar('action_url', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    foreignKey({ columns: [table.userId], foreignColumns: [users.id], name: 'fk_ai_insights_user_id' }),
    index('idx_ai_insights_user_id').on(table.userId),
  ]
);

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId],
  }),
  skills: many(skills),
  projects: many(projects),
  certificates: many(certificates),
  activities: many(activities),
  connections: many(connections),
  analytics: many(analyticsSnapshots),
  insights: many(aiInsights),
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  user: one(users, {
    fields: [skills.userId],
    references: [users.id],
  }),
}));

export const projectsRelations = relations(projects, ({ one }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
}));

export const certificatesRelations = relations(certificates, ({ one }) => ({
  user: one(users, {
    fields: [certificates.userId],
    references: [users.id],
  }),
}));

export const activitiesRelations = relations(activities, ({ one }) => ({
  user: one(users, {
    fields: [activities.userId],
    references: [users.id],
  }),
}));

export const connectionsRelations = relations(connections, ({ one }) => ({
  user: one(users, {
    fields: [connections.userId],
    references: [users.id],
  }),
  connectedUser: one(users, {
    fields: [connections.connectedUserId],
    references: [users.id],
  }),
}));

export const analyticsRelations = relations(analyticsSnapshots, ({ one }) => ({
  user: one(users, {
    fields: [analyticsSnapshots.userId],
    references: [users.id],
  }),
}));

export const aiInsightsRelations = relations(aiInsights, ({ one }) => ({
  user: one(users, {
    fields: [aiInsights.userId],
    references: [users.id],
  }),
}));
