@IsTest
public class TestSynchronisePickListCategories {
    static testmethod void updateContact() {
          try {
            // Query for the contact, which has been associated with an account.
            Contact queriedContact = [SELECT Name
                                      FROM Contact 
                                      LIMIT 1];
         
            // Update the contact's phone number
            queriedContact.Phone = '5555555555';
            
             System.debug('Contact after trigger fired: ' + queriedContact.Phone);
            update queriedContact;
        } catch(Exception e) {
            System.debug('An unexpected error has occurred: ' + e.getMessage());
        }
    }
}