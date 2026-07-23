import { getDatabase, schema } from './index';

/**
 * Seeds the database with mock data
 * This utility converts the mock-data.ts into actual database records
 * Run this after setting up a Neon database connection
 */

export async function seedDatabase() {
  try {
    const db = getDatabase();
    
    if (!db || Object.keys(db).length === 0) {
      console.log('[v0] Database not configured. Seed operation skipped.');
      return { success: true, message: 'Database not configured - running in mock mode' };
    }

    // Import mock data
    const {
      currentUser,
      mockSkills,
      mockProjects,
      mockCertificates,
      mockActivities,
      mockConnections,
    } = await import('@/lib/mock-data');

    console.log('[v0] Starting database seed...');

    // 1. Insert user
    console.log('[v0] Seeding user...');
    const userResult = await (db as any)
      .insert(schema.users)
      .values({
        username: currentUser.username,
        displayName: currentUser.displayName,
        email: currentUser.email || 'user@example.com',
        avatar: currentUser.avatar,
        coverImage: currentUser.coverImage,
        bio: currentUser.bio,
        tagline: currentUser.tagline,
        currentLevel: currentUser.level,
        totalXP: currentUser.totalXP,
        streak: currentUser.streak,
      })
      .returning();

    const userId = userResult?.[0]?.id;
    if (!userId) throw new Error('Failed to create user');

    // 2. Insert user profile
    console.log('[v0] Seeding user profile...');
    await (db as any)
      .insert(schema.userProfiles)
      .values({
        userId,
        education: 'Computer Science',
        experience: 'Software Engineer',
        location: 'San Francisco, CA',
        isPublic: true,
      })
      .catch(() => null); // Ignore if it fails

    // 3. Insert skills
    console.log('[v0] Seeding skills...');
    if (mockSkills && Array.isArray(mockSkills)) {
      for (const skill of mockSkills) {
        await (db as any)
          .insert(schema.skills)
          .values({
            userId,
            name: skill.name,
            category: skill.category,
            proficiencyLevel: skill.proficiencyLevel,
            proficiencyPercentage: skill.proficiency,
            endorsements: skill.endorsements,
            yearsOfExperience: parseFloat((Math.random() * 5).toFixed(1)),
          })
          .catch(() => null);
      }
    }

    // 4. Insert projects
    console.log('[v0] Seeding projects...');
    if (mockProjects && Array.isArray(mockProjects)) {
      for (const project of mockProjects) {
        await (db as any)
          .insert(schema.projects)
          .values({
            userId,
            title: project.title,
            description: project.description,
            image: project.image,
            techStack: project.techStack || [],
            githubUrl: project.githubUrl,
            liveUrl: project.liveUrl,
            likes: project.likes,
            views: project.views,
            category: project.category,
          })
          .catch(() => null);
      }
    }

    // 5. Insert certificates
    console.log('[v0] Seeding certificates...');
    if (mockCertificates && Array.isArray(mockCertificates)) {
      for (const cert of mockCertificates) {
        await (db as any)
          .insert(schema.certificates)
          .values({
            userId,
            name: cert.name,
            issuer: cert.issuer,
            issuedDate: new Date(cert.issueDate),
            expiryDate: cert.expiryDate ? new Date(cert.expiryDate) : null,
            isVerified: cert.verified,
          })
          .catch(() => null);
      }
    }

    // 6. Insert activities
    console.log('[v0] Seeding activities...');
    if (mockActivities && Array.isArray(mockActivities)) {
      for (const activity of mockActivities) {
        await (db as any)
          .insert(schema.activities)
          .values({
            userId,
            type: activity.type,
            title: activity.title,
            description: activity.description,
            icon: activity.icon,
            timestamp: new Date(activity.timestamp),
          })
          .catch(() => null);
      }
    }

    console.log('[v0] Database seed completed successfully');
    return {
      success: true,
      message: 'Database seeded successfully',
      userId,
    };
  } catch (error) {
    console.error('[v0] Database seed failed:', error);
    return {
      success: false,
      error: String(error),
    };
  }
}
