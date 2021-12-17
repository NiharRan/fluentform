<template>
    <div v-loading="loading">
        <el-row class="setting_header">
            <el-col :md="12">
                <template>
                    <h2>Front End Edit Form </h2>
                    <p>Add & update each user entry on user form submission in front end  </p>
                </template>
            </el-col>
            <!--Save selected.value-->
            <el-col :md="12" class="action-buttons clearfix mb15 text-right">
                <el-button

                        class="pull-right"
                        icon="el-icon-arrow-left"
                        size="small"
                >Back
                </el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-tabs  type="border-card">
                <el-tab-pane label="Settings">
                    <el-form v-if="feed.settings" label-position="left" label-width="205px">
                        <field-mapper
                                :field="{ component: 'value_text', label: 'Feed Title', placeholder: 'Feed Title' }"
                                :editorShortcodes="editorShortcodes"
                                :errors="errors"
                                v-model="feed.name"
                        >
                        </field-mapper>

                        <!-- form iteration loop -->
                        <field-mapper
                                v-for="field in settings_fields"
                                :key="field.key"
                                :field="field"
                                :errors="errors"
                                :editorShortcodes="editorShortcodes"
                                v-model="feed.settings[field.key]"
                        />
                    </el-form>
                    <el-button v-loading="saving" @click="saveFeed()" type="success">Save Feed Settings</el-button>
                </el-tab-pane>

            </el-tabs>
        </el-row>

    </div>
</template>

<script>
    import FieldMapper from "./GeneralIntegration/FieldMapper";
    export default {
        name: "FrontEndffEditForm",
        props: ["form_id", "inputs", "has_pro", "editorShortcodes"],
        components: {
            FieldMapper
        },
        data(){
            return {
                saving: false,
                loading: false,
                addVisible: false,
                errors: new Errors(),
                feed:{
                    name:'Test',
                    settings:{
                        fields:[]
                    }
                },
                settings_fields: []
            }
        },
        methods:{
            fetchSettings(){
                this.loading = true;
                FluentFormsGlobal.$get({
                    form_id: this.form_id,
                    action: 'ff_get_edit_form_settings',
                })
                    .then(response => {

                        this.settings_fields = response.data.settings_fields;
                        console.log(response)
                    })
                    .fail(e => {
                        console.log(e);
                    })
                    .always(() => {
                        this.loading = false;
                    });
            }
        },
        mounted(){
            this.fetchSettings()
        }

    }
</script>

<style scoped>

</style>
