/**
 * Enums for photo-modal tabs.
 */
export enum PhotoTab {
    FiltersTab = 'filters-tab', // Represents the filters tab
    AdjustmentsTab = 'adjustments-tab', // Represents the adjustments tab
    FormTab = 'form-tab', // Represents the form tab
}

/**
 * Enums for photo-modal stages.
 */
export enum PhotoStage {
    CreatePost = 'create-post', // Represents the create post stage
    EditPostAdjustments = 'edit-post-adjustments', // Represents the edit post adjustments stage
    EditPostForm = 'edit-post-form', // Represents the edit post form stage
    SharingPost = 'sharing-post', // Represents the sharing post stage
    PostShared = 'post-shared', // Represents the post shared stage
    PostFailed = 'post-failed', // Represents the post failed stage
}
