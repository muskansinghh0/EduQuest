import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ContentLibrary = ({ onContentSelect, onContentEdit }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const contentItems = [
    {
      id: 1,
      title: "Introduction to Mathematics",
      type: "lesson",
      subject: "Mathematics",
      grade: "Class 5",
      language: "English",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop",
      fileSize: "2.5 MB",
      uploadDate: "2025-01-08",
      views: 245,
      downloads: 89,
      status: "published"
    },
    {
      id: 2,
      title: "गणित की मूल बातें",
      type: "video",
      subject: "Mathematics",
      grade: "Class 5",
      language: "Hindi",
      thumbnail: "https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?w=300&h=200&fit=crop",
      fileSize: "45.2 MB",
      uploadDate: "2025-01-07",
      views: 189,
      downloads: 67,
      status: "published"
    },
    {
      id: 3,
      title: "Science Experiments",
      type: "lesson",
      subject: "Science",
      grade: "Class 6",
      language: "English",
      thumbnail: "https://images.pixabay.com/photo/2017/09/07/08/54/money-2724241_1280.jpg?w=300&h=200&fit=crop",
      fileSize: "3.8 MB",
      uploadDate: "2025-01-06",
      views: 156,
      downloads: 45,
      status: "draft"
    },
    {
      id: 4,
      title: "English Grammar Quiz",
      type: "quiz",
      subject: "English",
      grade: "Class 4",
      language: "English",
      thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
      fileSize: "1.2 MB",
      uploadDate: "2025-01-05",
      views: 298,
      downloads: 112,
      status: "published"
    },
    {
      id: 5,
      title: "History Audio Lesson",
      type: "audio",
      subject: "History",
      grade: "Class 7",
      language: "Hindi",
      thumbnail: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?w=300&h=200&fit=crop",
      fileSize: "12.5 MB",
      uploadDate: "2025-01-04",
      views: 134,
      downloads: 56,
      status: "published"
    },
    {
      id: 6,
      title: "Geography Maps",
      type: "lesson",
      subject: "Geography",
      grade: "Class 8",
      language: "English",
      thumbnail: "https://images.pixabay.com/photo/2014/10/23/18/05/burger-500054_1280.jpg?w=300&h=200&fit=crop",
      fileSize: "5.7 MB",
      uploadDate: "2025-01-03",
      views: 87,
      downloads: 23,
      status: "review"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Content', count: contentItems?.length },
    { value: 'lesson', label: 'Lessons', count: contentItems?.filter(item => item?.type === 'lesson')?.length },
    { value: 'video', label: 'Videos', count: contentItems?.filter(item => item?.type === 'video')?.length },
    { value: 'quiz', label: 'Quizzes', count: contentItems?.filter(item => item?.type === 'quiz')?.length },
    { value: 'audio', label: 'Audio', count: contentItems?.filter(item => item?.type === 'audio')?.length }
  ];

  const filteredContent = contentItems?.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item?.type === selectedCategory;
    const matchesSearch = item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         item?.subject?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTypeIcon = (type) => {
    const icons = {
      lesson: 'BookOpen',
      video: 'Play',
      quiz: 'FileText',
      audio: 'Volume2'
    };
    return icons?.[type] || 'File';
  };

  const getStatusColor = (status) => {
    const colors = {
      published: 'text-success',
      draft: 'text-warning',
      review: 'text-accent'
    };
    return colors?.[status] || 'text-muted-foreground';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-foreground">Content Library</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <Icon name="List" size={16} />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
          <Button
            key={category?.value}
            variant={selectedCategory === category?.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category?.value)}
            className="micro-scale"
          >
            {category?.label}
            <span className="ml-2 text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
              {category?.count}
            </span>
          </Button>
        ))}
      </div>
      {/* Content Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent?.map((item) => (
            <div key={item?.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item?.thumbnail}
                  alt={item?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <div className="bg-background/90 backdrop-blur-sm rounded-full p-2">
                    <Icon name={getTypeIcon(item?.type)} size={16} className="text-primary" />
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full bg-background/90 backdrop-blur-sm ${getStatusColor(item?.status)}`}>
                    {item?.status}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{item?.title}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>{item?.subject}</span>
                    <span>{item?.grade}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{item?.language}</span>
                    <span>{item?.fileSize}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs">
                    <span className="flex items-center">
                      <Icon name="Eye" size={12} className="mr-1" />
                      {item?.views}
                    </span>
                    <span className="flex items-center">
                      <Icon name="Download" size={12} className="mr-1" />
                      {item?.downloads}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(item?.uploadDate)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onContentSelect(item)}
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onContentEdit(item)}
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredContent?.map((item) => (
            <div key={item?.id} className="bg-card border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name={getTypeIcon(item?.type)} size={20} className="text-primary" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{item?.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{item?.subject}</span>
                    <span>{item?.grade}</span>
                    <span>{item?.language}</span>
                    <span>{item?.fileSize}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Icon name="Eye" size={14} className="mr-1" />
                    {item?.views}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Download" size={14} className="mr-1" />
                    {item?.downloads}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(item?.status)}`}>
                    {item?.status}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onContentSelect(item)}
                  >
                    <Icon name="Eye" size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onContentEdit(item)}
                  >
                    <Icon name="Edit" size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {filteredContent?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileX" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No content found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ContentLibrary;