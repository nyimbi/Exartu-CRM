Placements = new Meteor.Collection("placements", {
  transform: function (placement) {
    if (placement.jobInfo) {
      _.extend(placement, placement.jobInfo);
    };
    if (placement.employeeInfo) {
      _.extend(placement, placement.employeeInfo);
    }
    if (placement.status != null) {
      placement.statusName = LookUps.findOne({ _id: placement.status }).displayName;
    }
    return placement;
  }
});
extendedSubscribe('placements', 'PlacementHandler');