-- AddForeignKey
ALTER TABLE `travelNote` ADD CONSTRAINT `travelNote_travelPlanId_fkey` FOREIGN KEY (`travelPlanId`) REFERENCES `travelPlan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `travelPlan` ADD CONSTRAINT `travelPlan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
