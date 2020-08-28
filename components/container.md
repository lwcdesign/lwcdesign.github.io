# Container

This is a container component.

{% tabs %}
{% tab title="ContainsOperator.cmp" %}
```markup
<aura:component controller="LightningUtility" >
    <aura:handler name="init" value="{!this}" action="{!c.doInit}" />
 
    <aura:attribute name="items" type="List" />
    <aura:attribute name="element" type="String" />
    <aura:attribute name="condition" type="Boolean" />
    
    <aura:if isTrue="{!v.condition}">
        {!v.body}
    </aura:if>
</aura:component>
```
{% endtab %}

{% tab title="ContainsOperatorController.js" %}
```javascript
({
    doInit: function(component, event, helper) {
        var fetchprofile = component.get("c.getCurrentUserProfile");
        fetchprofile.setParams({ "userid" : $A.get("$SObjectType.CurrentUser.Id") });
        fetchprofile.setCallback(this, function(response){
            var state = response.getState();
            
            if(state === "SUCCESS") {
                var profile = response.getReturnValue();
                var getList = component.get('v.items').split(',');
                component.set('v.element',profile.Name);
                
                var getElement = component.get('v.element');
               
                var getElementIndex = getList.indexOf(getElement);
                
                // if getElementIndex is not equal to -1 it's means list contains this element. 
                if(getElementIndex != -1){ 
                    component.set('v.condition',true);
                    
                }else{
                    component.set('v.condition',false);
                }
            }
        });
        $A.enqueueAction(fetchprofile);
    }
})
```
{% endtab %}

{% tab title="LightningUtility.apxc" %}
```java
public without sharing class LightningUtility {
    @AuraEnabled
    public static Profile getCurrentUserProfile(String userid){
        String profileid =[Select ProfileId from User where id=:userid].ProfileId;
        Profile profile = [Select Id,Name from Profile where id=:profileid];
        return profile;
    }
}
```
{% endtab %}
{% endtabs %}

