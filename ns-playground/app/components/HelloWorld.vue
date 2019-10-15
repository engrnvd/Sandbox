<template>
    <Page class="page" @loaded="onPageLoaded">
        <ActionBar title=" " flat="true" v-bind:class="{ completed: activeTabIndex == 1 }"></ActionBar>

        <TabView :selectedIndex="activeTabIndex" @selectedIndexChange="onTabChange"
            selectedTabTextColor="#42B883" androidTabsPosition="bottom">
            <TabViewItem title="To Do" textTransform="uppercase">
                <GridLayout rows="auto, auto, *">
                    <Label row="0" class="header" text="My Tasks" />

                    <TextField row="1" ref="taskInput" v-model="textFieldValue"
                        hint="Type new task..." returnKeyType="done"
                        @returnPress="onReturnPress" />

                    <ListView row="2" class="list-group" for="todo in todos"
                        @itemTap="onItemTap">
                        <v-template>
                            <GridLayout columns="auto, *" class="list-entry">
                                <Label col="0" v-on:tap="onTodoCircleTap(todo)"
                                    class="circle" text=" " />
                                <Label col="1" v-on:tap="onTodoItemTap(todo)"
                                    :text="todo.name" textWrap="true" />
                            </GridLayout>
                        </v-template>
                    </ListView>

                </GridLayout>
            </TabViewItem>
            <TabViewItem title="Completed" textTransform="uppercase">
                <GridLayout rows="auto, *">
                    <Label row="0" class="header completed" text="Completed Tasks" />
                    <ListView row="1" class="list-group" for="done in dones">
                        <v-template>
                            <GridLayout columns="auto, *" class="list-entry list-entry-completed">
                                <Label col="0" v-on:tap="onCompletedCircleTap(done)"
                                    class="circle" text="✓" />
                                <Label col="1" v-on:tap="onCompletedItemTap(done)"
                                    :text="done.name" textWrap="true" />
                            </GridLayout>
                        </v-template>
                    </ListView>
                </GridLayout>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
    const platform = require("tns-core-modules/platform");
    const frame = require("tns-core-modules/ui/frame");
    const appSettings = require("application-settings");
    export default {
        data() {
            return {
                activeTabIndex: 0,
                textFieldValue: "",
                dones: JSON.parse(appSettings.getString("dones", "[]")),
                todos: JSON.parse(appSettings.getString("todos", "[]"))
            };
        },
        watch: {
            "todos": (value) => {
                appSettings.setString("todos", JSON.stringify(value))
            },
            "dones": (value) => {
                appSettings.setString("dones", JSON.stringify(value))
            },
        },
        methods: {
            onPageLoaded() {
                if (platform.isIOS) {
                    const navBar = frame.topmost().ios.controller.navigationBar;
                    navBar.barStyle = UIBarStyle.UIBarStyleBlack;
                    IQKeyboardManager.sharedManager().enableAutoToolbar =
                        false;
                }
            },
            onReturnPress() {
                if (this.textFieldValue.trim() === "") {
                    this.$refs.taskInput.nativeView.focus();
                    return;
                }
                this.todos.unshift({
                    name: this.textFieldValue
                });
                this.textFieldValue = "";
            },
            onTabChange(tab) {
                this.activeTabIndex = tab.value;
            },
            onTodoItemTap(item) {
                const index = this.todos.indexOf(item);
                action("What do you want to do with this task?", "Cancel", [
                    "Mark completed",
                    "Delete forever"
                ]).then(result => {
                    console.log(result);
                    switch (result) {
                        case "Mark completed":
                            this.dones.unshift(item);
                            this.todos.splice(index, 1);
                            this.activeTabIndex = 1;
                            break;
                        case "Delete forever":
                            this.todos.splice(index, 1);
                            break;
                        case "Cancel" || undefined:
                            break;
                    }
                });
            },
            onTodoCircleTap(item) {
                const index = this.todos.indexOf(item);
                this.dones.unshift(item);
                this.todos.splice(index, 1);
                this.activeTabIndex = 1;
            },
            onCompletedItemTap(item) {
                const index = this.dones.indexOf(item);
                action("What do you want to do with this task?", "Cancel", [
                    "Mark to do",
                    "Delete forever"
                ]).then(result => {
                    console.log(result);
                    switch (result) {
                        case "Mark to do":
                            this.todos.unshift(item);
                            this.dones.splice(index, 1);
                            this.activeTabIndex = 0;
                            break;
                        case "Delete forever":
                            this.dones.splice(index, 1);
                            break;
                        case "Cancel" || undefined:
                            break;
                    }
                });
            },
            onCompletedCircleTap(item) {
                const index = this.dones.indexOf(item);
                this.todos.unshift(item);
                this.dones.splice(index, 1);
                this.activeTabIndex = 0;
            }
        }
    };
</script>

<style scoped>
    .circle {
        width: 30;
        height: 30;
        padding: 0;
        color: #42B883;
        font-size: 25;
        border-color: #42B883;
        border-width: 2;
        border-radius: 50;
    }

    .list-entry .circle {
        margin: 0 10 0 0;
    }

    .list-entry Label {
        font-weight: bold;
        font-size: 17;
        vertical-align: middle;
        padding: 17 0;
        margin: 0;
    }

    .list-entry {
        padding: 0 15;
        color: #42B883;
    }

    .list-entry-completed .circle {
        color: white;
        background-color: #42B883;
        text-align: center;
        padding: 0;
    }

    ActionBar {
        background-color: #35495E;
    }

    .header {
        background-color: #35495E;
        color: white;
        font-size: 34;
        font-weight: 600;
        padding: 0 15 15 15;
        margin: 0;
    }

    .completed {
        background-color: #42B883;
    }

    TextField {
        width: 100%;
        font-size: 17;
        color: black;
        placeholder-color: #C1C1C1;
        padding: 17;
        border-width: 0 0 1 0;
        border-color: #E0E0E0;
    }
</style>