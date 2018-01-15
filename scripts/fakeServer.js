/**
 * Created by davidbra on 20/12/2015.
 */

//Phony Data
var jsonVal =
[
    {
        monitor_id: "1",
        monitor_name: "first",
        created_date: "1/2/25",
        updated_date: "1/2/25",
        category: "category1",
        subcategory: "sub1",
        db_environment: "1",
        description: "I am a description",
        table_name: "tbl_1",
        threshold: "5",
        recheck_time: "4564",
        source_sql: "SELECT *",
        target_sql: "SELECT *",
        frequency_sec: "60",
        is_active: "1",
        email_first_strike: "davidbra@cisco.com",
        email_second_strike: "dkotin@cisco.com",
        is_deleted: "0",
        created_by: "David",
        updated_by: "Anna"
    }, {
    monitor_id: "2",
    monitor_name: "second",
    created_date: "1/2/25",
    updated_date: "1/2/25",
    category: "category1",
    subcategory: "sub2",
    db_environment: "2",
    description: "I am a description",
    table_name: "tbl_1",
    threshold: "5",
    recheck_time: "4564",
    source_sql: "SELECT *",
    target_sql: "SELECT *",
    frequency_sec: "60",
    is_active: "0",
    email_first_strike: "davidbra@cisco.com",
    email_second_strike: "dkotin@cisco.com",
    is_deleted: "1",
    created_by: "David",
    updated_by: "Anna"
}];

var mockDataForThisTest = "json=" + encodeURI(jsonVal);

var jsonThresholds = [
{
    threshold_id:"1",
    category:"category1",
    subcategory:"subcategory1",
    tablename:"tbl1",
    agent:"i am an agent",
    threshold:"1",
    created_date:"1/1/1",
    updated_date:"2/2/2",
    updated_by:"David",
    created_by:"Anna"
},
    {
        threshold_id:"1",
        category:"category1",
        subcategory:"subcategory1",
        tablename:"tbl1",
        agent:"i am an agent",
        threshold:"1",
        created_date:"1/1/1",
        updated_date:"2/2/2",
        updated_by:"David",
        created_by:"Anna"
    }
    ];

var jsonEnvironments = [
    {
        environment_id:"1",
        environment_name:"env1",
        env_double:"5",
        env1_source:"source1",
        env1_target:"target1",
        created_date:"1/1/1",
        updated_date:"2/2/2",
    },
    {
        environment_id:"2",
        environment_name:"env2",
        env_double:"5",
        env1_source:"source2",
        env1_target:"target2",
        created_date:"1/1/1",
        updated_date:"2/2/2",
    }
];

var categoriesfake = ["a","b","ab"];

var subcategoriesfake = ["a","b","ab"];