CREATE TABLE `files` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`path` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `files_path_unique` ON `files` (`path`);