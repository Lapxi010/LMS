-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lesson" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "titleImg" TEXT,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "srcVideo" TEXT,
    "rating" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Lesson_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lesson" ("courseId", "createdAt", "description", "id", "rating", "srcVideo", "title", "titleImg", "userId") SELECT "courseId", "createdAt", "description", "id", "rating", "srcVideo", "title", "titleImg", "userId" FROM "Lesson";
DROP TABLE "Lesson";
ALTER TABLE "new_Lesson" RENAME TO "Lesson";
CREATE UNIQUE INDEX "Lesson_title_key" ON "Lesson"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
