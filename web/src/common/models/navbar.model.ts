/**
 * Interface for the Navigation Bar items
 */
export interface NavBarItem {
    /** Page Title */
    title?: string

    /** Page Path */
    path: string

    /** Page Name in router */
    name?: string

    /** Custome CSS class if any for the item */
    customClass?: string

    /** Icon name if any for the item */
    iconName?: string
    
    /** Icon fontawesome class if any for the item */
    iconFaClass?: string

    /** Icon svg name if any for the item */
    iconSvgName?: string

    /** Event listener if any for the item */
    onClick?: () => void

    /** Image if any for the item */
    img?: string
}