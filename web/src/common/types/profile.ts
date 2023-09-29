
/**
 * Profile stats interface
 */
export interface ProfileStats {

    /**
     * Title of the stats i.e "Followers" or "Following" etc.
     */
    title: string

    /**
     * Count of the stats i.e "100" or "200" etc.
     */
    count: number

    /**
     * Action to be performed when the stats is clicked
     */
    action: () => void
}

/**
 * Profile tab label type
 */
export type ProfileTabLabel = 'TAGGED' | 'POSTS' | 'PEEDS' | 'SAVED'

/**
 * Profile tab icon size type
 */
export type ProfileTabIconSize = 'profile-posts-large' | 'profile-posts-small' | 'profile-peed-large' | 'profile-peed-small' | 'profile-saved-large' | 'profile-saved-small' | 'profile-tagged-large' | 'profile-tagged-small'

/**
 * Profile tab name type
 */
export type ProfileTabName = 'profile-posts' | 'profile-peed' | 'profile-saved' | 'profile-tagged'

/**
 * Profile tab element interface
 */
export interface ProfileTabElement {

    /**
     * Name of the tab i.e "Posts" or "IGTV" etc.
     */
    name: ProfileTabName

    /**
     *  Label of the tab i.e "Posts" or "IGTV" etc.
     */
    label: ProfileTabLabel

    /**
     * Icon for the tab
     */
    iconLarge?: ProfileTabIconSize

    /**
     * Small icon for the tab if any
     */
    iconSmall?: ProfileTabIconSize

    /**
     * Action to be performed when the tab is clicked
     */
    action: () => void
}