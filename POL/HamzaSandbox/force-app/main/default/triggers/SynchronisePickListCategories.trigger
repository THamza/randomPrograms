trigger SynchronisePickListCategories on Contact (before update) {
    for(Contact c: Trigger.new){
        if(c.TEST_irrelevant__c){
            c.TEST_type__c = 'Irrelevant';
        }else if(c.TEST_frequent__c){
            c.TEST_type__c = 'Frequent';
        }else if(c.TEST_key_player__c){
            c.TEST_type__c = 'Key Player';
        }
    }
}