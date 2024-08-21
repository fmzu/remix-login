CREATE TABLE `users` (
	`id` text(256) PRIMARY KEY NOT NULL,
	`email` text(256) NOT NULL,
	`hashed_password` text(256)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);