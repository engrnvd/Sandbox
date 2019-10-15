<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app v-if="loggedIn">
            <v-list dense>
                <template v-for="item in items">
                    <v-list-group v-if="item.children"
                                  :key="item.text"
                                  v-model="item.model"
                                  :prepend-icon="item.model ? item.icon : item['icon-alt']"
                                  append-icon="">
                        <template v-slot:activator>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ item.text }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        <v-list-item v-for="(child, i) in item.children" :key="i" @click="">
                            <v-list-item-action v-if="child.icon">
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ child.text }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                    <v-list-item v-else :key="item.text" @click="onNavItemClicked(item.action)">
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark v-if="loggedIn">
            <v-toolbar-title style="width: 230px" class="ml-0 pl-4">
                <span class="hidden-sm-and-down">My Website</span>
            </v-toolbar-title>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-text-field flat
                          solo-inverted
                          hide-details
                          prepend-inner-icon="search"
                          label="Search"
                          class="hidden-sm-and-down"
            ></v-text-field>
            <div class="flex-grow-1"></div>
            <v-btn icon>
                <v-icon>mdi-apps</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>
            <v-btn icon large>
                <v-avatar size="32px" item>
                    <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify">
                    </v-img>
                </v-avatar>
            </v-btn>
        </v-app-bar>

        <router-view></router-view>

        <v-dialog v-model="dialog" width="800px">
            <v-card>
                <v-card-title class="grey darken-2">
                    Create contact
                </v-card-title>
                <v-container>
                    <v-row>
                        <v-col class="align-center justify-space-between" cols="12">
                            <v-row align="center">
                                <v-avatar size="40px" class="mr-4">
                                    <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt="">
                                </v-avatar>
                                <v-text-field
                                        placeholder="Name"
                                ></v-text-field>
                            </v-row>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field prepend-icon="business" placeholder="Company"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                    placeholder="Job title"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                    prepend-icon="mail"
                                    placeholder="Email"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                    type="tel"
                                    prepend-icon="phone"
                                    placeholder="(000) 000 - 0000"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                    prepend-icon="notes"
                                    placeholder="Notes"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-btn text color="primary">More</v-btn>
                    <div class="flex-grow-1"></div>
                    <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
                    <v-btn text @click="dialog = false">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
    export default {
        props: {
            source: String,
        },
        data: () => ({
            dialog: false,
            drawer: null,
            items: [
                {icon: 'contacts', text: 'Contacts'},
                {icon: 'history', text: 'Frequently contacted'},
                {icon: 'content_copy', text: 'Duplicates'},
                {
                    icon: 'keyboard_arrow_up',
                    'icon-alt': 'keyboard_arrow_down',
                    text: 'More',
                    model: false,
                    children: [
                        {text: 'Import'},
                        {text: 'Export'},
                        {text: 'Print'},
                        {text: 'Undo changes'},
                        {text: 'Other contacts'},
                    ],
                },
                {icon: 'logout', text: 'Logout', action: 'logout'},
            ],
        }),
        methods: {
            onNavItemClicked(action) {
                switch (action) {
                    case 'logout':
                        this.$store.dispatch('auth/logout').then(() => {
                            this.$router.replace('login');
                        });
                        break;
                    default:
                        alert('Ok');
                }
            },
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.isLoggedIn
            }
        },
        mounted() {
            let isLoggedIn = localStorage.getItem('isLoggedIn');
            let token = localStorage.getItem('token');
            let user = JSON.parse(localStorage.getItem('user'));
            this.$store.commit('auth/setLoggedIn', isLoggedIn);
            this.$store.commit('auth/setToken', token);
            this.$store.commit('auth/setUser', user);
        }
    }
</script>
